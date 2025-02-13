export interface ResponseData {
    data: any;
}

export interface ErrorResponse {
    code: number;
    error: string[];
    responseCode: string;
}