import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import {useKeycloak} from "@react-keycloak/web";

export interface ProtectedRouteProps extends RouteProps {
    isAllowed: boolean;
    path: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {

    const [keycloak, keycloakIntialized] = useKeycloak();
    let redirectPath = '';
    const authenticated = keycloakIntialized && keycloak.authenticated;
    if (!authenticated) {
        keycloak.login({redirectUri: window.location.href})
    }
    if (authenticated && !props.isAllowed) {
        redirectPath = "/error";
    }

    if (redirectPath) {
        return  <Redirect to={{ pathname: redirectPath }} />;
    } else {
        return <Route {...props} />;
    }
};

export default ProtectedRoute;