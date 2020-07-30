import {useKeycloak} from "@react-keycloak/web";
import React from "react";

export default function CurrentRoles() {
    const {keycloak, initialized} = useKeycloak();

    function renderResourceAccess(key: string) {

        return <div>
            <h4>{key}</h4>
            <ul>
                {keycloak!.resourceAccess![key].roles.map(value => <li>{value}</li>)}
            </ul>
        </div>;
    }

    return <p> {initialized && keycloak && keycloak.resourceAccess && Object.keys(keycloak.resourceAccess).map((key) => renderResourceAccess(key))} </p>
}