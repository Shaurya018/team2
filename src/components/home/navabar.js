import { useContext } from "react";
import {NavLink} from "react-router-dom";

import {AuthContext} from "../../AuthContext"   ;

const Navbar = () => {
    const auth = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5 px-5">
            <a className="navbar-brand" href="#">Report Webapp</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {localStorage.getItem('isLoggedIn') && (<li className="nav-item active">
                        <NavLink className="nav-link" to="api/Reports" exact>Home<span className="sr-only">(current)</span></NavLink>
                    </li>)}
                </ul>
                <ul className="navbar-nav">
                    {localStorage.getItem('isLoggedIn') && (<li className="nav-item active">
                        <button className="nav-link btn btn-secondary" onClick={auth.logout}>Logout<span className="sr-only">(current)</span></button>
                    </li>)}
                </ul>
                <ul className="navbar-nav">
                    {!auth.isLoggedIn && (<li className="nav-item active">
                        <NavLink className="nav-link" to="api/login" exact>Login<span className="sr-only">(current)</span></NavLink>
                    </li>)}
                </ul>
            </div>
            </nav>
    );
};

export default Navbar;