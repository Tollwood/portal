import {Link, useLocation} from "react-router-dom";
import React from "react";

export default function Sidebar() {
    let location = useLocation();
    return <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"} id="v-pills-home-tab" data-toggle="pill"
              role="tab">Home</Link>
        <Link to="/profile" className={location.pathname === "/profile" ? "nav-link active" : "nav-link"} id="v-pills-profile-tab"
              data-toggle="pill" role="tab">Profil</Link>
        <Link to="/users" className={location.pathname.includes("/users") ? "nav-link active" : "nav-link"} id="v-pills-users-tab"
              data-toggle="pill" role="tab">Benutzer</Link>
    </div>
}
