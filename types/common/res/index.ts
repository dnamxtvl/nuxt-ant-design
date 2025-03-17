export type ResponseData = any;
import type { Rule } from "ant-design-vue/es/form";
type InputType = "text" | "select" | "date" | "radio" | "checkbox" | "number" | "range-date" | "sub-modal";
type FormatDateType = "YYYY/MM/DD" | "YYYY/MM/DD HH:mm:ss" | "YYYY/MM/DD HH:mm" | "YYYY/MM/DD HH" | "YYYY/MM/DD HH:mm:ss.SSS" |
    "DD/MM/YYY HH:mm:ss" | "DD/MM/YYY HH:mm" | "DD/MM/YYY HH" | "DD/MM/YYY HH:mm:ss.SSS" | "YYYY-MM-DD" | "YYYY-MM-DD HH:mm:ss" |
    "YYYY-MM-DD HH:mm" | "YYYY-MM-DD HH" | "YYYY-MM-DD HH:mm:ss.SSS" | "DD-MM-YYY HH:mm:ss" | "DD-MM-YYY HH:mm" | "DD-MM-YYY HH" |
    "DD-MM-YYY HH:mm:ss.SSS" | "MM/DD/YYYY" | "MM/DD/YYYY HH:mm:ss" | "MM/DD/YYYY HH:mm" | "MM/DD/YYYY HH" | "MM/DD/YYYY HH:mm:ss.SSS";

export interface ErrorResponse {
    status: number;
    error: string[];
    responseCode: string;
}

export interface ItemBreadcrumb {
    name: string;
    link: string;
}

export interface ItemFormSearch {
    name: string;
    label: string;
    type: InputType;
    placeholder?: string | null;
    options?: Array<{ label: string; value: string }>;
    defaultValue?: number | string | null,
    formatDate?: FormatDateType;
    rules?: Rule[];
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    specialFieldHandle?: string;
}

export interface Pagination {
    current_page: number;
    total_page: number;
    records: number;
}