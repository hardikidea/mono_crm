import { HttpClient } from './HttpClient';

export class UserService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public async getUsers() {
        const response = await this.httpClient.makeRequest('get', '/users');
        return response.data;
    }

    // public async getUserById(userId: number): Promise<{ id: number; name: string }> {
    //     const response = await this.httpClient.makeRequest('get', `/users/${userId}`);
    //     return response.data;
    // }
}
