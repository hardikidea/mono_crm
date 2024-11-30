import axios from "axios";
import {HttpInterceptor} from "../HttpClient";

export const RetryInterceptor = (maxRetries: number = 3): HttpInterceptor => ({
    onResponseError: async (error: any) => {
        const config = error.config;
        config.retryCount = config.retryCount || 0;
        if (config.retryCount < maxRetries) {
            config.retryCount++;
            const delay = Math.pow(2, config.retryCount) * 100;
            await new Promise((resolve) => setTimeout(resolve, delay));
            return axios.request(config);
        }
        return Promise.reject(error);
    },
});
