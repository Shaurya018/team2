import React, {useState, useContext} from "react";
import {Link, Redirect} from "react-router-dom";

import { AuthContext } from "../../AuthContext";
import Spinner from "../UI/Spinner/Spinner";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [phone, setPhone] = useState("");
    const [isRedirect, setIsRedirect] = useState(false);
    const [error, setError] = useState(false);

    const [isloading, setIsLoading] = useState(false);

    const auth = useContext(AuthContext);

    const emailHandler = (event) => {
       setEmail(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const firstNameHandler = (event) => {
        setFirstName(event.target.value);
    }

    const lastNameHandler = (event) => {
        setLastName(event.target.value);
    }

    const phoneHandler = (event) => {
        setPhone(event.target.value);
    }

    const adminHandler = (event) => {
        const adminCheck = event.target.value === "on" && isAdmin === true ? false : true;
        setIsAdmin(adminCheck);
    }
    
    const signupHandler = (event) => {
        event.preventDefault();

        const data = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email:email,
            password:password,
            isAdmin:isAdmin
        };

        setIsLoading(true);

        // hit backend api to add user and then redirect

        fetch("http://localhost:27944/api/Logins", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log(res);
            setIsLoading(false);
            setIsRedirect(true);
            if(!res.ok) {
                setError(true);
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    if(error && isRedirect) {
        return <Redirect to="/api/signup" />
    }
    else if(error === false && isRedirect) {
        return <Redirect to="/api/login" />
    }

    return (
        <React.Fragment>
        {isloading && <Spinner show={isloading} />}

        <div className="row">
            <div className="offset-md-3 col-md-6">
                <div className="container pb-2">
                    <div className="text-center">
                        <h1 className="display-4 my-3">Sign Up</h1>
                    </div>
                    <form onSubmit={signupHandler} className="mx-5">
                        <div className="form-group">
                            <label htmlFor="firstName">Frist Name</label>
                            <input type="text" className="form-control" id="firstName" onChange={firstNameHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" id="lastName" onChange={lastNameHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" className="form-control" id="phone" onChange={phoneHandler}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" onChange={emailHandler}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" onChange={passwordHandler}/>
                        </div>
                        <div className="form-group form-check">
                            <input checked={isAdmin} type="checkbox" className="form-check-input" id="isAdmin" onChange={adminHandler}/>
                            <label className="form-check-label" htmlFor="isAdmin">Signup as Admin</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </form>
                    <div className="mx-5 mt-3 mb-0">
                        <p>Already signed up ?</p>
                        <Link
                            to="/api/login"
                            exact
                            className="btn btn-sm btn-outline-secondary mt-0"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        </React.Fragment>
    );
};

export default Signup;