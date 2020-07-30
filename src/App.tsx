import React from 'react';
import './App.css';
import {KeycloakProvider} from '@react-keycloak/web';
import keycloak from "./keycloak/Keycloak";
import MainPage from "./MainPage";
import Profile from "./Profile";
import Users from "./keycloak/Users";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import UsersDetails from "./keycloak/UsersDetails";
import 'bootstrap/dist/css/bootstrap.css';

function App() {

    return (
        <KeycloakProvider keycloak={keycloak} LoadingComponent={<div>"Init Keycloak</div>} onEvent={(event, error) => {
            console.log('onKeycloakEvent', event, error)
        }} autoRefreshToken={true}>
            <Router>
                <div className="container">
                    <div className="row">
                        <div className="col"><Header/></div>
                    </div>
                    <div className="row">
                        <div className="col-2"><Sidebar/></div>
                        <div className="col">
                            <Switch>
                                <ProtectedRoute path="/profile" component={Profile} isAllowed={true}/>
                                <ProtectedRoute path="/users/:id" component={UsersDetails} isAllowed={true}/>
                                <ProtectedRoute path="/users" component={Users} isAllowed={true}/>
                                <Route exact path={"/login"}>
                                    <Login />
                                </Route>
                                <Route path="/">
                                    <MainPage/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"><Footer/></div>
                    </div>
                </div>
            </Router>
        </KeycloakProvider>
    );
}

export default App;
