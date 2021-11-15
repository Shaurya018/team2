import React, {useState, useContext} from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import Spinner from "../UI/Spinner/Spinner";

const Login = () => {
    const [username, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [isloading, setIsLoading] = useState(false);

    const auth = useContext(AuthContext);

    const usernameHandler = (event) => {
        setuserName(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }
    
    const loginHandler = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };

        // hit backend api to add user and then redirect
        setIsLoading(true);
        fetch("http://localhost:27944/api/Logins/post", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if(response.ok) {
                auth.login();
            }
            else {
                <Redirect to="/api/login" />
            }
            return response.json();
        })
        .then(data => {
            setIsLoading(false);
            console.log(data)
            localStorage.setItem('isAdmin', data.isAdmin)
            auth.setAdmin(data.isAdmin);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <React.Fragment>
        {isloading && <Spinner show={isloading} />}
        <div className="row mt-5">
            <div className="offset-md-4 col-md-4">
                <div className="container text-center mb-5">
                    <h1 className="display-3">Login</h1>
                </div>
                <form onSubmit={loginHandler}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" onChange={usernameHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" onChange={passwordHandler} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <div className="mt-5">
                    <p className="mb-1">Don't have an account ? </p>
                    <Link
                        to="/api/signup"
                        exact
                        className="btn btn-sm btn-outline-secondary m-0"
                    >
                        Signup
                    </Link>
                </div>        
            </div>
        </div>
        
        
        </React.Fragment>
    );
};

export default Login;