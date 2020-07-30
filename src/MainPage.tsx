import {withKeycloak} from '@react-keycloak/web'
import React from 'react';

// @ts-ignore
const MainPage = ({keycloak, keycloakInitialized}) => {



    return (
        <div>
            Main Page
        </div>
    )
};

export default withKeycloak(MainPage)