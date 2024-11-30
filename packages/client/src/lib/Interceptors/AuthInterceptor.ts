import {HttpInterceptor} from "../HttpClient";

export const AuthInterceptor = (authType: 'bearer' | 'cookie' | 'basic', tokenOrCredentials: string | { username: string; password: string }): HttpInterceptor => ({
    onRequest: (config: any) => {
        if (authType === 'bearer') {
            config.headers = { ...config.headers, Authorization: `Bearer ${tokenOrCredentials}` };
        } else if (authType === 'cookie') {
            config.headers = { ...config.headers, Cookie: `auth_token=${tokenOrCredentials}` };
        } else if (authType === 'basic') {
            const credentials = tokenOrCredentials as { username: string; password: string };
            config.headers = {
                ...config.headers,
                Authorization: `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
            };
        }
        return config;
    },
});
