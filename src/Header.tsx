import * as React from "react";
import LoginButton from "./Login";
import LogoutButton from "./LogoutButton";

export default function Header() {
    return <div>
        <div style={{float: "right"}}>
            <LoginButton/>
            <LogoutButton/>
        </div>
        <h1>Webportal</h1>
    </div>

}