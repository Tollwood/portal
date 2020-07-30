import {useKeycloak} from '@react-keycloak/web'
import React from 'react'

export default function LoginButton() {

    const [keycloak, keycloakInitialized] = useKeycloak();
    return (
        <div>
            { keycloakInitialized && !keycloak.authenticated && (
                <button type="button" onClick={() => keycloak.login()}>
                    Login
                </button>
            )}
        </div>
    )
};