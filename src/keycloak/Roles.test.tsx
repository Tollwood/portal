import React from 'react';
import {render, waitForElement} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import Roles from "./Roles";
import {User} from "./User";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {KEAYCLOAK_HOST, KEYCLOAK_REALM_NAME} from "./KeycloakAdminService";
import {ReactKeycloakHookResult} from "@react-keycloak/web"

import * as Keycloak from "@react-keycloak/web"
var mock = new MockAdapter(Axios);

jest.mock("@react-keycloak/web");
const mockedKeycloak = Keycloak as jest.Mocked<typeof Keycloak>;

mockedKeycloak.useKeycloak.mockImplementation(() => {
    return { initialized: true, keycloak:{token:"1234"}} as ReactKeycloakHookResult
});

test("initial state", () => {

    const {getByTestId} = render(<Roles user={{} as User}/>);
    const rolesHeader = getByTestId("roles-header");
    expect(rolesHeader).toBeInTheDocument();
    expect(rolesHeader).toHaveTextContent("Rollen");
    const rolesTable = getByTestId("roles-table");
    expect(rolesTable).toBeInTheDocument();

    const thActive = getByTestId("roles-table-col-header-active");
    expect(thActive).toBeInTheDocument();

    const thName = getByTestId("roles-table-col-header-name");
    expect(thName).toBeInTheDocument();
});

xtest("roles loaded", async () => {

    const accessToken = "1234";
    mock.onGet(`${KEAYCLOAK_HOST}/admin/realms/${KEYCLOAK_REALM_NAME}/roles`, "", expect.objectContaining({'Authorization': `Bearer ${accessToken}`})).reply(200, allRoles);
    const {getByTestId, debug} = render(<Roles user={{} as User}/>);
    await waitForElement<HTMLElement>(() => {
        return getByTestId("row-Admin");
    });
    debug();

});

const allRoles = `[
    {
        "id": "345f88ea-8fa1-4903-9f29-f452ccf4f991",
        "name": "offline_access",
        "description": "\${role_offline-access}",
        "composite": false,
        "clientRole": false,
        "containerId": "test"
    },
    {
        "id": "9b4ca400-827b-45b5-bd2b-b145d58c1b2b",
        "name": "Admin",
        "composite": true,
        "clientRole": false,
        "containerId": "test"
    },
    {
        "id": "e8898b46-3491-4b75-bed4-7230b29f06de",
        "name": "uma_authorization",
        "description": "\${role_uma_authorization}",
        "composite": false,
        "clientRole": false,
        "containerId": "test"
    }
]`;