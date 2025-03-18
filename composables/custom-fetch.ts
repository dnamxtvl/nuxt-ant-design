import { ROUTE_APP } from "~/constants/config/route";
import helperApp from "~/utils/helper";
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

    const { data, error } = await useFetch<T>(url, optionFetch);

    if (error.value && import.meta.server) {
      const errorServer = {
        status: error.value.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        error: error.value?.message || "An error occurred",
        responseCode: typeof error.value?.data?.errors?.code === 'number' ? error.value?.data?.errors?.code : 0,
      }
      
      throw errorServer;
    }

    return data.value;
}

const logOut = () => {
  pushNotification("Token Expired", "Your token has expired. Please log in again.");
  helperApp.logOutWhenTokenExpired();
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

  displayNotification(errorData);

  throw errorData;
};

export const displayNotification = (error: ErrorResponse) => {
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

export const clearInvalidParams = (searchFields: ItemFormSearch[], disabedFields: string[] = []) => {
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

  Object.keys(params).forEach((key: string) => {
    const param = params[key] as string;

    if (key == "page" || key == "limit") {
      serializePageParam();
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

const serializePageParam = () => {
  const router = useRouter();
  const route = useRoute();
  if (route.query.page && !useValidator().isValidPage(route.query.page)) {
    const newPageQuery = { ...route.query, page: DEFAULT_PAGE };
    router.push({
      path: route.path,
      query: newPageQuery,
    });
  }

  if (route.query.limit && !useValidator().isValidPerPage(route.query.limit)) {
    const newOffsetQuery = { ...route.query, limit: DEFAULT_PER_PAGE };
    router.push({
      path: route.path,
      query: newOffsetQuery,
    });
  }
};
