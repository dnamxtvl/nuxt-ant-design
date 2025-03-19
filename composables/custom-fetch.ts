import { ROUTE_APP } from "~/constants/config/route";
import Helper from "~/utils/helper";
import { notification } from 'ant-design-vue';
import type { NotificationPlacement } from 'ant-design-vue/lib/notification';
import { StatusCodes } from "http-status-codes";
import type { ErrorResponse, ItemFormSearch } from "~/types/common/res";
import type { UseFetchOptions } from "#app";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, JWT_KEY_ACEESS_TOKEN_NAME } from '~/constants/config/application';
import CookieManager from "~/utils/cookies";
import { useRouter, useRoute } from "nuxt/app";

export const customFetch = $fetch.create({ // CSR
  onRequest({ options }) {
    const config = useRuntimeConfig();
    options.timeout = config.public.FETCH_TIMEOUT as unknown as number;
    options.baseURL = config.public.BACKEND_URL;

    const token = CookieManager.getCookie(JWT_KEY_ACEESS_TOKEN_NAME);
    options.headers.set('Accept', 'application/json');
    options.headers.set('Content-Type', options.method === 'POST' ? 'multipart/form-data' : 'application/json');
    if (token) {
      options.headers.set('Authorization', `Bearer ${token}`);
    }
  },
  onRequestError({ error }) {
    handleFetchError(error);
  },
  onResponseError({ response }) {
    handleFetchError(response);
  },
});

export async function useCustomFetch<T>(url: string, options: UseFetchOptions<T> = {}) { // SSR
  const config = useRuntimeConfig();
  const optionFetch = 
    {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': options.method === 'POST' ? 'multipart/form-data' : 'application/json',
      },
      immediate: true,
      baseURL: config.public.BACKEND_URL,
      timeout: config.public.FETCH_TIMEOUT as unknown as number,
      onRequest({ options }) {
        const tokenFetch = CookieManager.getCookie(JWT_KEY_ACEESS_TOKEN_NAME);
        if (tokenFetch) {
          options.headers.set('Authorization', `Bearer ${tokenFetch}`);
        }
      },
      onRequestError({ error }) {
        handleFetchError(error);
      },
      onResponseError({ response }) {
        handleFetchError(response);
      },
    } as UseFetchOptions<T>

    const { data, error } = await useFetch(url, optionFetch);
    if (error.value && import.meta.server) {
      if (error.value.statusCode === StatusCodes.UNAUTHORIZED) {
        logOut();
      } else {
        throw createError({ statusCode: error.value.statusCode, message: error.value.message });
      }
    }

    return data.value;
}

const logOut = () => {
  pushNotification("Token Expired", "Your token has expired. Please log in again.");
  Helper.logOutWhenTokenExpired();
  if (import.meta.server) return navigateTo(ROUTE_APP.AUTH.LOGIN);

  const router = useRouter();
  router.push(ROUTE_APP.AUTH.LOGIN);
}

const handleFetchError = (response: any) => {
  let errors: string[] = [];
  let errorMessages: string[] = [];
  let codeError: number = StatusCodes.SERVICE_UNAVAILABLE;

  if (response?._data) {
    let errorsObject: Record<string, string[]>;
    
    if (response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
      errorsObject = response._data.errors;
      Object.entries(errorsObject).forEach(([_, value]: [string, string[]]) => {
        errorMessages.push(value[0]);
      });

      errors = errorMessages;
    } else {
      errors = [response._data?.message || "An error occurred"];
    }

    codeError = response.status;
  }

  const errorData: ErrorResponse = {
    status: codeError,
    error: errors,
    responseCode: typeof response?._data?.errors?.code === 'number' ? response._data.errors.code : 0,
  };

  logger.error(errorData);
  showErrorPage(codeError);
  showErrorNotification(errorData);

  throw errorData;
};

const showErrorPage = (statusCode: number) => {
  if (import.meta.client && (statusCode === StatusCodes.INTERNAL_SERVER_ERROR ||
    statusCode === StatusCodes.FORBIDDEN ||
    statusCode === StatusCodes.NOT_FOUND) ||
    statusCode === StatusCodes.UNPROCESSABLE_ENTITY) {
      throw showError({ statusCode: statusCode });
  }
}

export const showErrorNotification = (error: ErrorResponse) => {
  if (error.status === StatusCodes.UNAUTHORIZED) {
    logOut();
  } else if (error.status === StatusCodes.SERVICE_UNAVAILABLE) {
    pushNotification("Server Error", "The server is not working. Please try again later.");
  } else {
    error.error.forEach((message: string) => {
      pushNotification("Error", message);
    })
  }
};


export const pushNotification = (message: string, description: string) => {
  if (import.meta.client) {
    const placement: NotificationPlacement = "topRight";
    notification.error({
      message: message,
      description: description,
      placement,
    });
  }
};

export const getDefaultParams = (searchFields: ItemFormSearch[], disabedFields: string[] = [], keepUrl = false) => {
  let invalidParams: string[] = [];
  let validParams = Object.fromEntries(
    searchFields
      .filter(({ defaultValue }) => defaultValue)
      .map(({ name, defaultValue, type }) => {
        if (defaultValue === null || defaultValue === undefined) {
          throw new Error("defaultValue is null or undefined");
        }

        let defaultValueString = defaultValue.toString();

        return [
          name,
          type === "range-date" && useValidator().isFieldValid({ type: "range-date" }, defaultValueString) ? defaultValueString.split(",") : defaultValue,
        ];
      })
  );

  const route = useRoute();
  const params = route.query;

  if (!keepUrl) {
    if (Object.keys(params).length > 0) updateUrl({}, true);

    return validParams;
  }

  Object.keys(params).forEach((key: string) => {
    const param = params[key] as string;

    if (key == "page" || key == "limit") {
      serializePageParam(true);
    } else if (param !== undefined && param != "" && param != null && !disabedFields.includes(key) && key !== "page" && key !== "limit") {
      const field = searchFields.find((field) => field.name === key);

      if (useValidator().isFieldValid(field, param) && field) {
        validParams[key] = param;
      } else {
        invalidParams.push(key);
      }
    } else if (key !== "page" && key !== "limit") {
      invalidParams.push(key);
    }
  });

  if (invalidParams.length > 0) removeInvalidParams(invalidParams);

  return validParams;
};

const removeInvalidParams = (invalidParams: string[]) => {
  if (invalidParams.length > 0) {
    const router = useRouter();
    const route = useRoute();
    const queryParams = { ...route.query };
    const uniqueInvalidParams = [...new Set(invalidParams)];

    uniqueInvalidParams.forEach((key) => {
      delete queryParams[key];
    });

    router.replace({
      path: route.path,
      query: { ...queryParams }
    });
  }
};

const serializePageParam = (keepUrl = false) => {
  const route = useRoute();
  if (route.query.page && !useValidator().isValidPage(route.query.page)) {
    const newPageQuery = { ...route.query, page: DEFAULT_PAGE };
    updateUrl(newPageQuery, keepUrl);
  }

  if (route.query.limit && !useValidator().isValidPerPage(route.query.limit)) {
    const newOffsetQuery = { ...route.query, limit: DEFAULT_PER_PAGE };
    updateUrl(newOffsetQuery, keepUrl);
  }
};

export const updateUrl = (query: Record<string, any>, keepUrl = false) => {
  const router = useRouter();
  const route = useRoute();
  if (!keepUrl) return;
  
  router.push({
    path: route.path,
    query: query,
  });
};
