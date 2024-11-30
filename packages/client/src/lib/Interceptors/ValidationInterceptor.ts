import {HttpInterceptor} from "../HttpClient";
import {InternalAxiosRequestConfig} from "axios";

export const ValidationInterceptor = (requiredHeaders: string[]): HttpInterceptor => ({
    onRequest: (config: InternalAxiosRequestConfig) => {
        const missingHeaders = requiredHeaders.filter((header) => !config.headers.has(header));
        if (missingHeaders.length > 0) {
            throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
        }
        return config as InternalAxiosRequestConfig;
    },
});
