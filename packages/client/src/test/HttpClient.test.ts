import {UserService} from "../lib/UserService";
import {HttpClient} from "../lib/HttpClient";

const mockResponses = { '/users': [{ id: 1, name: 'John Doe' }] };

test.skip('should fetch all users', async () => {
    const client = HttpClient.createNull(mockResponses);
    const service = new UserService(client);
    const users = await service.getUsers();
    expect(users).toEqual([{ id: 1, name: 'John Doe' }]);
});
