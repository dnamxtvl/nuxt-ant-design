import { ROUTE_APP } from "~/constants/config/route";
import helperApp from "~/utils/helper";
import { notification } from 'ant-design-vue';
import type { NotificationPlacement } from 'ant-design-vue/lib/notification';
import { STATUS_CODE } from "~/constants/config/application";

export const customFetch = $fetch.create({
  onRequest({ options }) {
  },
  onResponseError({ response }) {
    const error = response?._data?.data || {
      code: 500,
      error: ['Internal server error'],
      responseCode: 'SERVER_ERROR',
    };

    if (error.code === STATUS_CODE.TOKEN_EXPIRED) logOut();
    if (error.code === STATUS_CODE.NETWORK_ERROR) {
        const placement: NotificationPlacement = "topRight";
        notification.error({
            message: 'Server Error',
            description: 'The server is not working. Please try again later.',
            placement,
        });
    }

    throw error;
  },
});

export function useCustomFetch<T>(url: string, options: any = {}) {
    return useFetch<T>(url, {
      ...options,
      onResponseError({ response }) {
        const error = response?._data?.data || {
          code: 500,
          error: ['Internal server error'],
          responseCode: 'SERVER_ERROR',
        };

        if (error.code === STATUS_CODE.TOKEN_EXPIRED) logOut();
        if (error.code === STATUS_CODE.NETWORK_ERROR) {
            const placement: NotificationPlacement = "topRight";
            notification.error({
                message: 'Server Error',
                description: 'The server is not working. Please try again later.',
                placement,
            });
        }
  
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