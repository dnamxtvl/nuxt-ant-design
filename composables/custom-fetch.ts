import { ROUTE_APP } from "~/constants/config/route";
import helperApp from "~/utils/helper";
import { notification } from 'ant-design-vue';
import type { NotificationPlacement } from 'ant-design-vue/lib/notification';
import { StatusCodes } from "http-status-codes";
import type { ErrorResponse } from "~/types/common/res";
import type { UseFetchOptions } from "#app";
import { JWT_KEY_ACEESS_TOKEN_NAME } from '~/constants/config/application';
import CookieManager from "~/utils/cookies";

export const customFetch = $fetch.create({
  onRequest({ options }) {
    const token = CookieManager.getCookie(JWT_KEY_ACEESS_TOKEN_NAME);
    // if (token) {
    //   options.headers.set('Authorization', `Bearer ${token}`);
    // }
  },
  onResponseError({ response }) {
    console.log(response);
    handleFetchError(response);
  },
});

export function useCustomFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
  const optionFetch = 
    {
      ...options,
      onResponseError({ response }) {
        const error = response?._data?.data || {
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          error: ['Internal server error'],
          responseCode: 'SERVER_ERROR',
        };
  
        const placement: NotificationPlacement = "topRight";
        // handleError(error, placement);
  
        throw error;
      },
    } as UseFetchOptions<T>
  
    const { data, status, error, refresh } = useFetch<T>(url, optionFetch);

    return data.value;
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

// const handleError = (error: ErrorResponse, placement: NotificationPlacement) => {
//   if (error.code === StatusCodes.UNAUTHORIZED) {
//     logOut();
//   } else if (error.code === StatusCodes.SERVICE_UNAVAILABLE) {
//     notification.error({
//       message: 'Server Error',
//       description: 'The server is not working. Please try again later.',
//       placement,
//     });
//   } else {
//     notification.error({
//       message: 'Error',
//       description: error.error.shift(),
//       placement,
//     });
//   }
// }

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