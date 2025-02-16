import { EXPIRES_COOKIE_DAY } from "~/constants/config/application";

export default class CookieManager {
  static getCookie = (cookieName: string) => {
    const cookie = useCookie(cookieName);
    return cookie.value;
  }

  static setCookie = (cookieName: string, cookieValue: any) => {
    const cookie = useCookie(cookieName, {
      maxAge: EXPIRES_COOKIE_DAY * 24 * 60 * 60,
      sameSite: 'strict'
    });
    cookie.value = cookieValue;
  }

  static removeCookie = (cookieName: string) => {
    const cookie = useCookie(cookieName);
    cookie.value = null;
  }
}