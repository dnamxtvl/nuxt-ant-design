import type { FormInputReq } from '~/types/auth/req';
import { API_CONST } from '~/constants/config/api';
import type { ErrorResponse, ResponseData } from '~/types/common/res';
import type { LoginResponse } from '~/types/auth/res';

export default class AuthService {
    login = async (params: FormInputReq): Promise<{ data: LoginResponse }> => {
        const endpoint = API_CONST.AUTH.LOGIN;
        alert(endpoint);
        return await customFetch(endpoint, { method: "POST", body: params });
    };
    logout = async (params: {}, success: (json: ResponseData) => void, error: (error: ErrorResponse) => void, token: string) => {
        const endpoint = useRuntimeConfig().BACKEND_URL + 'api/' + API_CONST.AUTH.LOGOUT;
        await this.post(endpoint, params, success, error, token);
    };
}
