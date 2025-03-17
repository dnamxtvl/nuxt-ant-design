import { ROUTE_APP } from "~/constants/config/route";
import helperApp from "~/utils/helper";
import { notification } from 'ant-design-vue';
import type { NotificationPlacement } from 'ant-design-vue/lib/notification';
import { StatusCodes } from "http-status-codes";
import type { ErrorResponse, ItemFormSearch } from "~/types/common/res";
import type { UseFetchOptions } from "#app";
import { JWT_KEY_ACEESS_TOKEN_NAME } from '~/constants/config/application';
import CookieManager from "~/utils/cookies";
import { useRouter, useRoute } from "nuxt/app";

export const customFetch = $fetch.create({
  onRequest({ options }) {
    const token = CookieManager.getCookie(JWT_KEY_ACEESS_TOKEN_NAME);
    if (token) {
      options.headers.set('Authorization', `Bearer ${token}`);
    }
  },
  onRequestError({ request, options, error }) {
    
  },
  onResponseError({ response }) {
    handleFetchError(response);
  },
});

export async function useCustomFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
  const optionFetch = 
    {
      ...options,
      immediate: true,
      onRequest({ options }) {
        const tokenFetch = CookieManager.getCookie(JWT_KEY_ACEESS_TOKEN_NAME);
        if (tokenFetch) {
          options.headers.set('Authorization', `Bearer ${tokenFetch}`);
        }
      },
      onResponseError({ response }) {
        handleFetchError(response);
      },
    } as UseFetchOptions<T>

    return await useFetch<T>(url, optionFetch);
}

const logOut = () => {
  const placement: NotificationPlacement = "topRight";
  notification.error({
    message: 'Token Expired',
    description: 'Your token has expired. Please log in again.',
    placement,
  });
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
      Object.entries(errorsObject).forEach(([key, value]: [string, string[]]) => {
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

const displayNotification = (error: ErrorResponse) => {
  const placement: NotificationPlacement = "topRight";

  if (error.status === StatusCodes.UNAUTHORIZED) {
    logOut();
  } else if (error.status === StatusCodes.SERVICE_UNAVAILABLE) {
    notification.error({
      message: 'Server Error',
      description: 'The server is not working. Please try again later.',
      placement,
    });
  } else {
    error.error.forEach((message: string) => {
      notification.error({
        message: 'Error',
        description: message,
        placement,
      });
    })
  }
};

const fillFormStateFromUrl = (searchFields: ItemFormSearch[], disabedFields: String[]) => {
  const route = useRoute();
  const params = route.query;
  const validator = useValidator();
  const isFieldValid = (field: any, param: string) => {
    switch (field?.type) {
      case "select":
        return field?.options?.some((option: { label: string; value: string }) => option.value === param);
      case "text":
      case "number":
      case "sub-modal":
      case "checkbox":
      case "radio":
        return true;
      case "range-date":
        return validator.isValidRangeDate(param, field.formatDate ?? "YYYY/MM/DD");
      case "date":
        return validator.isValidDate(param, field.formatDate ?? "YYYY/MM/DD");
      default:
        return false;
    }
  };

  Object.keys(params).forEach((key: string) => {
    const param = params[key] as string;
    if (param !== undefined && param != "" && param != null && !fieldsDisabledState.value.includes(key) && key !== "page" && key !== "limit") {
      const field = props.fields.find((field) => field.name === key);
      if (isFieldValid(field, param)) {
        formState.value[key] = field?.type === "range-date" ? param.split(",") : param;
      } else {
        invalidParams.value.push(key);
      }
    } else if (key !== "page" && key !== "limit") {
      invalidParams.value.push(key);
    }
  });

  defaultFormState.value = cloneDeep(formState.value);
  defaultFormState.value = Object.fromEntries(
    Object.entries(defaultFormState.value).filter(([_, value]) => value !== null && value !== "" && value !== undefined)
  );
  if (rangeDateFields.value.length > 0) serializeRangeDate(rangeDateFields.value, defaultFormState.value);
};

const removeInvalidParams = () => {
  if (invalidParams.value.length > 0) {
    const queryParams = { ...route.query };
    const uniqueInvalidParams = [...new Set(invalidParams.value)];

    uniqueInvalidParams.forEach((key) => {
      delete queryParams[key];
    });

    router.replace({
      path: route.path,
      query: { ...queryParams }
    });
  }
};

const updateUrl = (query: Record<string, any>) => {
  const router = useRouter();
  const route = useRoute();

  router.push({
    path: route.path,
    query: query,
  });
};