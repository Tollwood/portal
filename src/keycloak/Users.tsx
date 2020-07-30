import React, {useEffect, useState} from 'react';
import '../App.css';
import KeycloakAdminService from "./KeycloakAdminService";
import {useKeycloak} from "@react-keycloak/web";
import {User} from "./User";
import {useHistory} from "react-router";
import {PencilIcon, PlusIcon, TrashIcon} from "@primer/octicons-react";

function Users() {

    const [users, setUsers] = useState<User[]>([]);
    const [keycloak, initialized] = useKeycloak();

    const history = useHistory();

    function fetchUsers() {
        if (initialized) {
            KeycloakAdminService.getUsers(keycloak.token!).then(res => {
                setUsers(res.data)
            })
        }
    }

    function newUser() {
        history.push("/users/new")
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    function deleteUser(user: User) {
        KeycloakAdminService.deleteUser(keycloak.token!, user).then(value => fetchUsers());
    }

    if (!initialized || !keycloak.authenticated) return null;

    function edit(user: User) {
        return history.push(`/users/${user.id}`);
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col"><h1><a style={{float:"right"}} onClick={newUser}><PlusIcon size={40} /></a>Benutzer</h1></div>
                </div>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Bearbeiten</th>
                    <th scope="col">Löschen</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user =>
                    <tr key={user.email}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>
                            <a onClick={() => edit(user)}><PencilIcon size={24} /></a>
                        </td>
                        <td>
                            <a onClick={() => deleteUser(user)}><TrashIcon size={24} /></a>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
