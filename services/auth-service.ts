import type { FormInputLogin } from '~/types/auth/input';
import BaseService from './base-service';
import API_CONST from '~/constants/config/api';
import type { ErrorResponse, ResponseData } from '~/types/common/res';

export default class AuthService extends BaseService {
    login = async (params: FormInputLogin, success: (json: ResponseData) => void, error: (error: ErrorResponse) => void) => {
        await this.post(API_CONST.AUTH.LOGIN, params, success, error);
    };
    logout = async (params: {}, success: (json: ResponseData) => void, error: (error: ErrorResponse) => void) => {
        await this.post(API_CONST.AUTH.LOGOUT, params, success, error);
    };
}
