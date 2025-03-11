export type ResponseData = any;
import type { Rule } from "ant-design-vue/es/form";
type InputType = "text" | "select" | "date" | "radio" | "checkbox" | "number" | "range-date" | "sub-modal";

export interface ErrorResponse {
    code: number;
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
    rules?: Rule[];
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    specialFieldHandle?: string;
}