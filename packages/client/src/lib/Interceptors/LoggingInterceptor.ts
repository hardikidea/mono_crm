import { logger } from '../Logger';
import {HttpInterceptor} from "../HttpClient";

export const LoggingInterceptor: HttpInterceptor = {
    onRequest: (config: any) => {
        logger.info(`Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    onResponse: (response) => {
        logger.info(`Response: ${response.status} ${response.config.url}`);
        return response;
    },
    onResponseError: (error) => {
        logger.error(`Error: ${error.message}`);
        return Promise.reject(error);
    },
};
