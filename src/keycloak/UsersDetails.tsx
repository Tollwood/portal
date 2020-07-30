import React, {useEffect, useState} from 'react';
import '../App.css';
import {useKeycloak} from "@react-keycloak/web";
import KeycloakAdminService from "./KeycloakAdminService";
import {User} from "./User";
import {useHistory, useParams} from "react-router";
import Roles from "./Roles";
import ResetPassword from "./ResetPassword";

function UsersDetails() {

    const [user, setUser] = useState<User>({credentials: [{}]});
    const [keycloak, initialized] = useKeycloak();
    const history = useHistory();
    let {id} = useParams();

    useEffect(() => {
        console.log(`id: ${id}`);
        if (id !== "new") {
            KeycloakAdminService.getUser(keycloak.token!, id)
                .then((loadedUser: User) => {
                    console.log(loadedUser);
                    setUser({...user, ...loadedUser });
                });
        }
    }, [id, keycloak]);

    function save() {
        if (initialized) {
            if(user.id){
                KeycloakAdminService.updateUser(keycloak.token!, user).then(() => {
                    history.push("/users");
                });
            }
            KeycloakAdminService.saveUser(keycloak.token!, user).then(() => {
                history.push("/users");
            });
        }
    }

    function cancel() {
        history.goBack();

    }
    if (!initialized || !keycloak.authenticated) return null;

    return (
        <div>
            <h1>{id !== "new"? "Benutzer Editieren": "Benutzer Anlegen"}</h1>
            <div className="form-group">
                <label htmlFor="loginInput">Login</label>
                <input type="text" className="form-control" id="loginInput" placeholder="Login" value={user.username}
                       onChange={event1 => setUser({...user, username: event1.target.value})}/>
            </div>
            <div className="form-group">
                <label htmlFor="firstNameInput">Vorname</label>
                <input type="text" className="form-control" id="firstNameInput" placeholder="Vorname" value={user.firstName}
                       onChange={event1 => setUser({...user, firstName: event1.target.value})}/>
            </div>
            <div className="form-group">
                <label htmlFor="lastNameInput">Nachname</label>
                <input type="text" className="form-control" id="lastNameInput" placeholder="Nachname" value={user.lastName}
                       onChange={event1 => setUser({...user, lastName: event1.target.value})}/>
            </div>
            <div className="form-group">
                <label htmlFor="emailInput">Email address</label>
                <input type="email" className="form-control" id="emailInput" placeholder="Enter email" value={user.email}
                       onChange={event1 => setUser({...user, email: event1.target.value})}/>
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Passwort</label>
                <input type="password" className="form-control" id="passwordInput" placeholder="Passwort" value={user.credentials![0].value}
                       onChange={event1 => setUser({
                           ...user,
                           credentials: [{temporary: false, type: 'password', value: event1.target.value}]
                       })}/>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="activeInput" checked={user.enabled}
                       onChange={event1 => setUser({...user, enabled: event1.target.checked})}/>
                <label className="form-check-label" htmlFor="activeInput">Active</label>
            </div>

            <button type="submit" className="btn btn-primary" onClick={save}>Speichern</button>
            <button className="btn btn-cancel" onClick={cancel}>Abbrechen</button>
            <Roles user={user}/>
            <ResetPassword/>
        </div>
    );
}

export default UsersDetails;
