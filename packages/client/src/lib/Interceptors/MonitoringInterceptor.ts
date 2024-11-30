import {HttpInterceptor} from "../HttpClient";

export const MonitoringInterceptor = (logCallback: (metric: { url: string; time: number }) => void): HttpInterceptor => ({
    onRequest: (config: any) => {
        (config as any).metadata = { startTime: Date.now() };
        return config;
    },
    onResponse: (response: any) => {
        const timeTaken = Date.now() - (response.config as any).metadata.startTime;
        logCallback({ url: response.config.url!, time: timeTaken });
        return response;
    },
});
