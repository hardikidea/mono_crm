import {HttpInterceptor} from "../HttpClient";

export const RateLimitingInterceptor = (maxRequests: number, perMilliseconds: number): HttpInterceptor => {
    let requestCount = 0;

    const resetRequestCount = () => {
        requestCount = 0;
    };

    setInterval(resetRequestCount, perMilliseconds);

    return {
        onRequest: async (config: any) => {
            if (requestCount >= maxRequests) {
                throw new Error('Rate limit exceeded');
            }
            requestCount++;
            return config;
        },
    };
};
