import React, {useState} from "react";
import {useKeycloak} from "@react-keycloak/web";

export default function AccessToken(){

    const {keycloak, initialized} = useKeycloak();
    const [showAccessToken, setShowAccessToken] = useState<boolean>(false);

    return <div>
        {showAccessToken && <p> {initialized && keycloak!.token }</p>}
        <button onClick={event1 => setShowAccessToken(!showAccessToken)}>AcessToken {showAccessToken? 'verbergen': 'anzeigen'}</button>
    </div>

}