import Keycloak from 'keycloak-js'

const keycloak:  Keycloak.KeycloakInstance = Keycloak({url: "http://localhost:8080/auth", realm:"test",clientId: "test"});

export default keycloak