import { useMainStore } from "~/store";
import moment from "moment";
import { USER_TYPE_ENUM } from "~/constants/enums/user";
import {
  JWT_KEY_ACEESS_TOKEN_NAME,
  USER_PROFILE_KEY_NAME,
} from "~/constants/config/application";
import CookieManager from "~/utils/cookies";
import type { LoginResponse } from "~/types/auth/res";

export default class helperApp {
  static getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message
    }
    return String(error)
  }

  static logOutWhenTokenExpired = () => {
    CookieManager.setCookie('isLoggedIn', false);
    let store = useMainStore();
    store.logout(store.$state);
  }

  static getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
  }

  static calculateTimeAgo = (timestamp: string) => {
    const currentTime = moment();
    const targetTime = moment(timestamp);
    
    const diffYears = currentTime.diff(targetTime, 'years');
    if (diffYears > 0) {
        return `${diffYears} năm trước`;
    }
    
    const diffMonths = currentTime.diff(targetTime, 'months');
    if (diffMonths > 0) {
        return `${diffMonths} tháng trước`;
    }

    const diffWeeks = currentTime.diff(targetTime, 'weeks');
    if (diffWeeks > 0) {
        return `${diffWeeks} tuần trước`;
    }
    
    const diffDays = currentTime.diff(targetTime, 'days');
    if (diffDays > 0) {
        return `${diffDays} ngày trước`;
    }
    
    const diffHours = currentTime.diff(targetTime, 'hours');
    if (diffHours > 0) {
        return `${diffHours} giờ trước`;
    }
    
    const diffMinutes = currentTime.diff(targetTime, 'minutes');

    if (diffMinutes > 0) {
        return `${diffMinutes} phút trước`;
    }

    return `now`;
  }

  static convertSecondsToTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  static redirectToHome = (type: number) => {
    if (type == USER_TYPE_ENUM.USER) {
      return navigateTo("/admin/dashboard/my-library");
    } else {
      return navigateTo("/admin/dashboard");
    }
  };

  static setValueStoreLogin = async (data: LoginResponse) => {
    let store = useMainStore();
    const userInfo = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      avatar: data.user.avatar
    };
    CookieManager.setCookie('isLoggedIn', true);
    CookieManager.setCookie(JWT_KEY_ACEESS_TOKEN_NAME, data.token);
    CookieManager.setCookie(USER_PROFILE_KEY_NAME, userInfo);
    store.login(store.$state, userInfo, data.token);
  };
};
