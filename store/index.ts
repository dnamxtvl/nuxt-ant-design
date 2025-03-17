import { defineStore } from 'pinia';
import { USER_PROFILE_KEY_NAME } from '~/constants/config/application';
import { JWT_KEY_ACEESS_TOKEN_NAME } from '~/constants/config/application';
import CookieManager from '~/utils/cookies';
import type { UserInfo } from '~/types/auth/res';

export const useMainStore = defineStore('store-pinia', {
  state: () => ({
    isLoggedIn: CookieManager.getCookie('isLoggedIn') ?? false,
    user: CookieManager.getCookie(USER_PROFILE_KEY_NAME) ?? null,
    token: CookieManager.getCookie(JWT_KEY_ACEESS_TOKEN_NAME) ?? null,
  }),
  getters: {
    getIsLoggedIn: (state: any) => state.isLoggedIn,
    getUser: (state: any) => state.user,
    getToken: (state: any) => state.token,
  },
  actions: {
    login(state: any, user: UserInfo, token: string){
      state.isLoggedIn = true
      state.user = user
      state.token = token
    },

    logout(state: any) {
      state.isLoggedIn = false
      state.user = null
      state.token = null;
    },

    changeAvatar(state: any, avatar: string) {
      state.user.avatar = avatar
    },
  },
});
