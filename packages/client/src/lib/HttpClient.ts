import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type HttpInterceptor = {
    onRequest?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
    onRequestError?: (error: any) => any;
    onResponse?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
    onResponseError?: (error: any) => any;
};

export class HttpClient {
    private http: AxiosInstance;

    constructor(baseURL: string, interceptors: HttpInterceptor[] = [], timeout = 5000) {
        this.http = axios.create({
            baseURL,
            headers: { 'Content-type': 'application/json' },
            withCredentials: true,
            timeout,
        });
        this.applyInterceptors(interceptors);
    }

    private applyInterceptors(interceptors: HttpInterceptor[]): void {
        interceptors.forEach((interceptor) => {
            if (interceptor.onRequest || interceptor.onRequestError) {
                this.http.interceptors.request.use(interceptor.onRequest, interceptor.onRequestError);
            }
            if (interceptor.onResponse || interceptor.onResponseError) {
                this.http.interceptors.response.use(interceptor.onResponse, interceptor.onResponseError);
            }
        });
    }

    public async makeRequest<T>(
        method: 'get' | 'post' | 'put' | 'patch' | 'delete',
        url: string,
        body?: Record<string, any>,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        const requestConfig = { ...config, method, url, data: body };
        return this.http.request<T>(requestConfig);
    }

    public static createNull(mockResponses: Record<string, any> = {}, throwError = false): HttpClient {
        const mockAxios: AxiosInstance = {
            request: async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
                const url = config.url!;
                if (throwError) {
                    throw new Error(`Mock error for ${url}`);
                }
                if (!mockResponses[url]) {
                    throw new Error(`No mock response configured for ${url}`);
                }
                return { data: mockResponses[url] } as AxiosResponse;
            },
        } as AxiosInstance;

        return new HttpClient('', [{ onRequest: (config: InternalAxiosRequestConfig) => config }]);
    }
}
