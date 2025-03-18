import Helper from "~/utils/helper";
import axios from 'axios';
import type { ErrorResponse, ResponseData } from "~/types/common/res";
import { StatusCodes } from "http-status-codes";

export default class BaseService {
    private prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    private logError(e: any, error: (error: ErrorResponse) => void) {
        let errors: string[] = [];
        let errorMessages: string[] = [];
        let codeError: number = StatusCodes.SERVICE_UNAVAILABLE;

        if (e.response?.hasOwnProperty('status')) {
            let errorsObject: Record<string, string[]>;
            if (e.response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
                errorsObject = e.response.data.errors;
                Object.entries(errorsObject).map(([key, value]: [string, string[]]) => {
                    errorMessages.push(value[0]);
                });

                errors = errorMessages;
            } else {
                errors = [Helper.getErrorMessage(e.response.data.message)];
            }

            codeError = e.response.status;
        }

        error({
            status: codeError,
            error: errors,
            responseCode: typeof e.response?.data?.errors?.code == 'number' ? e.response.data.errors.code : 0,
        });
    }

    async get(endpoint: string, params: Object, success: (json: ResponseData) => void, error: (error: ErrorResponse) => void, token: string = '') {
        try {
            let headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await this.getInstanceAxios().get(endpoint, { params });
            success(response.data);
        } catch (e) {
            this.logError(e, error);
        }
    }

    async post(
        endpoint: string,
        params: Record<string, any> = {},
        success: (json: ResponseData) => void,
        error: (error: ErrorResponse) => void,
        token: string = '',
        withFile: boolean = false,
    ) {
        try {
            let headers: Record<string, string> = withFile 
                ? { 'Content-Type': 'multipart/form-data' } 
                : { 'Content-Type': 'application/json' };

            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await this.getInstanceAxios().post(endpoint, params, { headers });
            success(response.data);
        } catch (e) {
            this.logError(e, error);
        }
    }

    async put(
        endpoint: string,
        params: Record<string, any> = {},
        success: (json: ResponseData) => void,
        error: (error: ErrorResponse) => void,
        withFile: boolean = false,
        token: string = '',
    ) {
        try {
            let headers: Record<string, string> = withFile 
                ? { 'Content-Type': 'multipart/form-data' } 
                : { 'Content-Type': 'application/json' };

            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await this.getInstanceAxios().put(endpoint, params, { headers });
            success(response.data);
        } catch (e) {
            this.logError(e, error);
        }
    }

    async delete(endpoint: string, data: Record<string, any> = {}, success: (json: any) => void, error: (error: ErrorResponse) => void) {
        try {
            const response = await this.getInstanceAxios().delete(endpoint, { data });
            success(response.data);
        } catch (e) {
            this.logError(e, error);
        }
    }

    async patch(
        endpoint: string,
        params: Record<string, any> = {},
        success: (json: ResponseData) => void,
        error: (error: ErrorResponse) => void
    ) {
        try {
            const response = await this.getInstanceAxios().patch(endpoint, params);
            success(response.data);
        } catch (e) {
            this.logError(e, error);
        }
    }

    urlParse(obj: Record<string, any>, query = false): string {
        const str = [];
        for (let p in obj) {
            if (obj.hasOwnProperty(p) && obj[p] !== null && obj[p] !== undefined && obj[p] !== '') {
                if (obj[p] === true) obj[p] = 1;
                if (obj[p] === false) obj[p] = 0;
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }

        if (query) return '?' + str.join('&') + '&' + query;
        return '?' + str.join('&');
    }

    getInstanceAxios = () => {
        const config = useRuntimeConfig();
        const instance = axios.create();
        instance.defaults.baseURL = config.public.BACKEND_URL;

        instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        instance.defaults.headers.get['Content-Type'] = 'application/json';
        instance.defaults.headers.put['Content-Type'] = 'multipart/form-data';
        instance.defaults.headers.delete['Content-Type'] = 'application/json';
        instance.defaults.headers.delete['Content-Type'] = 'application/json';

        instance.defaults.headers.post['Accept'] = 'application/json';
        instance.defaults.headers.get['Accept'] = 'application/json';
        instance.defaults.headers.put['Accept'] = 'application/json';
        instance.defaults.headers.delete['Accept'] = 'application/json';
        instance.defaults.headers.delete['Accept'] = 'application/json';

        return instance;
    }
}
