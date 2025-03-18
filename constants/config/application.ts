export const VN_LOCALE = 'vi';

export const EXPIRES_COOKIE_DAY = 90;

export const CALL_AXIOS_TIMEOUT = 300000;

export const JWT_KEY_ACEESS_TOKEN_NAME = 'jwt_access_token';

export const USER_PROFILE_KEY_NAME = 'user_profile_key';

export const STATUS_CODE = {
    NETWORK_ERROR: 911,
    SERVER_NOT_WORKING: 'ERR_NETWORK',
    VALIDATE_FAIL: 422,
    NOT_FOUND: 404,
    TOKEN_EXPIRED: 401,
    UNAUTHORIZED: 403,
}

export const ERROR_CODE = {
    UNVERIFIED_ACCOUNT: 1001873
}

export const ROUTE_APP = {
    auth: {
        login: '/auth/login',
    },
}

export const MENU_PERMISSION = {
    SYSTEM: {
        PREFIX_PATH: [
            '/admin/dashboard',
            '/admin/dashboard/quizzes',
            '/admin/dashboard/reports',
            '/admin/dashboard/list-user',
        ]
    },
    USER: {
        PREFIX_PATH: [
            '/admin/dashboard/my-library',
            '/admin/dashboard/reports',
        ]
    },
}

export const ERR_MESSAGE = {
    404: 'Page Not Found!',
    500: 'Internal Server Error',
    403: 'Forbidden',
}

export const PER_PAGE = [10, 20, 50, 100];
export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;
