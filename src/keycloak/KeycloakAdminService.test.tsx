import MockAdapter from "axios-mock-adapter";
import Axios from "axios";
import KeycloakAdminService, {KEAYCLOAK_HOST, KEYCLOAK_REALM_NAME} from "./KeycloakAdminService";
import {User} from "./User";

var mock = new MockAdapter(Axios);


test('getUsers success', async () => {
    const accessToken = "token";
    const user: User = {id: "12345"};
    mock.onGet(`${KEAYCLOAK_HOST}/admin/realms/${KEYCLOAK_REALM_NAME}/users/${user.id}`,"", expect.objectContaining({'Authorization': `Bearer ${accessToken}`})).reply(200, user );
    const expectedUser: User = await KeycloakAdminService.getUser(accessToken, user.id!);
    expect(user.id).toBe("12345");
});