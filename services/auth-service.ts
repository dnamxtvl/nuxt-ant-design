import type { FormInputReq } from '~/types/auth/req';
import { API_CONST } from '~/constants/config/api';
import type { LoginResponse } from '~/types/auth/res';

export default class AuthService {
    login = async (params: FormInputReq): Promise<{ data: LoginResponse }> => {
        const endpoint = API_CONST.AUTH.LOGIN;
        return await customFetch(endpoint, { method: "POST", body: params });
    };
    logout = async (): Promise<{ data: [] }> => {
        const endpoint = API_CONST.AUTH.LOGOUT;
        return await customFetch(endpoint, { method: "POST" });
    };
}
