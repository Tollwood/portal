import * as React from 'react';
import {Redirect, RouteProps,} from 'react-router-dom';
import {useKeycloak} from "@react-keycloak/web";

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isSignedIn: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {

    const [keycloak, keycloakInitialized] = useKeycloak();
    const {component: Component} = props;


    if( keycloakInitialized && !keycloak.authenticated){
        return <Component {...props} />
    }

    return <Redirect
        to={{
            pathname: '/login',
            state: {from: props.location}
        }}
    />
};

export default PrivateRoute;