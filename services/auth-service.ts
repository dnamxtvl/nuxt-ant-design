import type { FormInputLogin } from '~/types/auth/input';
import BaseService from './base-service';
import { API_CONST } from '~/constants/config/api';
import type { ErrorResponse, ResponseData } from '~/types/common/res';
import type { LoginResponse } from '~/types/auth/res';

export default class AuthService extends BaseService {
    login = async (params: FormInputLogin, success: (json: LoginResponse) => void, error: (error: ErrorResponse) => void) => {
        const endpoint = useRuntimeConfig().BACKEND_URL + 'api/' + API_CONST.AUTH.LOGIN;
        await this.post(endpoint, params, success, error);
    };
    logout = async (params: {}, success: (json: ResponseData) => void, error: (error: ErrorResponse) => void, token: string) => {
        const endpoint = useRuntimeConfig().BACKEND_URL + 'api/' + API_CONST.AUTH.LOGOUT;
        await this.post(endpoint, params, success, error, token);
    };
}
