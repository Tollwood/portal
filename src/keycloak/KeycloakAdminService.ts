import Axios, {AxiosPromise} from "axios";
import {User} from "./User";
import Role from "./Role";

export const KEYCLOAK_REALM_NAME = "test";
export const KEAYCLOAK_HOST = "http://localhost:8080/auth";

export default class KeycloakAdminService {


    static addHAuthorationHeader(accessToken: string) {
        return {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };
    }

    static getUsers(accessToken: string): AxiosPromise {
        return Axios.get(`${KEAYCLOAK_HOST}/admin/realms/${KEYCLOAK_REALM_NAME}/users`, this.addHAuthorationHeader(accessToken))
    }

    static saveUser(accessToken: string, user: User) {
        return Axios.post(`${KEAYCLOAK_HOST}/admin/realms/${KEYCLOAK_REALM_NAME}/users`, user, this.addHAuthorationHeader(accessToken))
    }

    static updateUser(accessToken: string, user: User) {
        return Axios.put(`${KEAYCLOAK_HOST}/admin/realms/${KEYCLOAK_REALM_NAME}/users/${user.id}`, user, this.addHAuthorationHeader(accessToken))
    }

    static deleteUser(accessToken: string, user: User) {
        return Axios.delete(`${KEAYCLOAK_HOST}/admin/realms/${KEYCLOAK_REALM_NAME}/users/${user.id}`, this.addHAuthorationHeader(accessToken))
    }

    static getUser(accessToken: string, id: string): Promise<User> {
        return  Axios.get(`${KEAYCLOAK_HOST}/admin/realms/${KEYCLOAK_REALM_NAME}/users/${id}`, this.addHAuthorationHeader(accessToken))
            .then(response => {
                return response.data;
            });
    }

    static getAllRoles(accessToken: string): Promise<Role[]> {
        return Axios.get(`${KEAYCLOAK_HOST}/admin/realms/${KEYCLOAK_REALM_NAME}/roles`, this.addHAuthorationHeader(accessToken))
            .then(response => {
                return response.data;
            });
    }

    static getRolesByUser(accessToken: string, user: User): Promise<Role[]> {
        return Axios.get(`${KEAYCLOAK_HOST}/admin/realms/${KEYCLOAK_REALM_NAME}/users/${user.id}/role-mappings/realm`, this.addHAuthorationHeader(accessToken))
            .then(response => {
                return response.data;
            });
    }

    static assignRoleToUser(accessToken: string, user: User, role: Role) {
        return Axios.post(`${KEAYCLOAK_HOST}/admin/realms/${KEYCLOAK_REALM_NAME}/users/${user.id}/role-mappings/realm`, [role], this.addHAuthorationHeader(accessToken))
            .then(response => {
                return response.data;
            });
    }
    static removeRoleFromUser(accessToken: string, user: User, role: Role) {
        return Axios.delete(`${KEAYCLOAK_HOST}/admin/realms/${KEYCLOAK_REALM_NAME}/users/${user.id}/role-mappings/realm`,  { ...this.addHAuthorationHeader(accessToken), data: [role]});
    }
}