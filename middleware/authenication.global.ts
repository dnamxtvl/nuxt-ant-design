import { ROUTE_APP } from "~/constants/config/route";
import { useMainStore } from "~/store";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useMainStore();
    if (!store.getIsLoggedIn) {
        if (to.path !== '/admin/login' && to.path.includes('/admin')) {
            return navigateTo('/admin/login');
        }
        return;
    }

    if (to.path === '/admin/login' || to.path.includes('/auth')) {
        return navigateTo(ROUTE_APP.CONTRACT.LIST);
    }
});