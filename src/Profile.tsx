import {useKeycloak} from '@react-keycloak/web'
import React, {useEffect, useState} from "react";
import {KeycloakProfile} from "keycloak-js";
import AccessToken from "./keycloak/AccessToken";
import CurrentRoles from "./keycloak/CurrentRoles";

export default function Profile() {
    const {keycloak, initialized} = useKeycloak();
    const [userProfile, setUserProfile] = useState<KeycloakProfile>({});


    useEffect(() => {
        if (initialized && !!keycloak!.authenticated) {
            keycloak!.loadUserProfile()
                .then(function (profile: Keycloak.KeycloakProfile) {
                    setUserProfile(profile);
                }).catch(function () {
                alert('Failed to load user profile');
            });
        }

    }, [initialized, keycloak]);

    return (
        <div>
            <h1>Hallo {userProfile.firstName ? `${userProfile.firstName} ${userProfile.lastName}` : "unbekannter"}</h1>
            <AccessToken/>
            <CurrentRoles/>
        </div>
    )
}