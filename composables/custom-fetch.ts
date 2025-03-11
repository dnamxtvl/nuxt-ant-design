import { ROUTE_APP } from "~/constants/config/route";
import helperApp from "~/utils/helper";
import { notification } from 'ant-design-vue';
import type { NotificationPlacement } from 'ant-design-vue/lib/notification';
import { StatusCodes } from "http-status-codes";
import type { ErrorResponse } from "~/types/common/res";

export const customFetch = $fetch.create({
  onRequest({ options }) {
  },
  onResponseError({ response }) {
    const error = response?._data?.data || {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      error: ['Internal server error'],
      responseCode: 'SERVER_ERROR',
    };

    const placement: NotificationPlacement = "topRight";
    handleError(error, placement);

    throw error;
  },
});

export function useCustomFetch<T>(url: string, options: any = {}) {
    return useFetch<T>(url, {
      ...options,
      onResponseError({ response }) {
        const error = response?._data?.data || {
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          error: ['Internal server error'],
          responseCode: 'SERVER_ERROR',
        };

        const placement: NotificationPlacement = "topRight";
        handleError(error, placement);
  
        throw error;
      },
    });
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

const handleError = (error: ErrorResponse, placement: NotificationPlacement) => {
  if (error.code === StatusCodes.UNAUTHORIZED) {
    logOut();
  } else if (error.code === StatusCodes.SERVICE_UNAVAILABLE) {
    notification.error({
      message: 'Server Error',
      description: 'The server is not working. Please try again later.',
      placement,
    });
  } else {
    notification.error({
      message: 'Error',
      description: error.error.shift(),
      placement,
    });
  }
}