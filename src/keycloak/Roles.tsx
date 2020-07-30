import React, {useEffect, useState} from 'react';
import '../App.css';
import KeycloakAdminService from "./KeycloakAdminService";
import {useKeycloak} from "@react-keycloak/web";
import Role from "./Role";
import {User} from "./User";

function Roles(props: { user: User }) {

    const [roles, setRoles] = useState<Role[]>([]);
    const [assignedRoles, setAssignedRolesRoles] = useState<Role[]>([]);
    const [keycloak, initialized] = useKeycloak();

    function fetchRoles() {
        KeycloakAdminService.getAllRoles(keycloak.token!).then(res => {
            setRoles(res);
        });
    }

    function fetchRolesByUser() {

        if (initialized) {
            KeycloakAdminService.getRolesByUser(keycloak.token!, props.user).then(res => {
                setAssignedRolesRoles(res)
            })
        }

    }

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        fetchRolesByUser()
    }, [props.user.id]);

    function changeRoleMapping(role: Role) {
        if (isMapped(role)) {
            KeycloakAdminService.removeRoleFromUser(keycloak.token!, props.user, role).then(() => {
                setAssignedRolesRoles(assignedRoles.filter(value => value.id !== role.id));
            });
        } else {
            KeycloakAdminService.assignRoleToUser(keycloak.token!, props.user, role).then(() => {
                setAssignedRolesRoles(prev => [...prev, role]);
            });
        }
    }

    function isMapped(role: Role): boolean {
        return assignedRoles.map(value => value.name).includes(role.name);
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col"><h1 data-testid="roles-header">Rollen</h1></div>
                </div>
            </div>
            <table className="table" data-testid="roles-table">
                <thead>
                <tr>
                    <th scope="col" data-testid="roles-table-col-header-active">Aktiv</th>
                    <th scope="col" data-testid="roles-table-col-header-name">Name</th>
                </tr>
                </thead>
                <tbody>
                {roles.map(role =>
                    <tr key={role.name} data-testid={`row-${role.name}`}>
                        <td><input type={"checkbox"} checked={isMapped(role)} onChange={() => {
                            changeRoleMapping(role)
                        }}/></td>
                        <td>{role.name}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Roles;
