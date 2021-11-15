import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from './components/home/Home';
import {AuthContext} from "./AuthContext";
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import CreateReport from './components/home/AdminFunctions/CreateReport';
import EditReport from './components/home/AdminFunctions/EditReport';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const temp = localStorage.getItem('isLoggedIn');

  useEffect(() => {
    if(temp) {
      setIsLoggedIn(true);
    }
  }, [temp]);

  const login = () => {
    localStorage.setItem('isLoggedIn', true);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const setAdmin = (isAdmin) => {
    setIsAdmin(isAdmin);
  };

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/api/Reports" exact>
          <Home />
        </Route>
        <Route path="/api/createReport" exact>
          <CreateReport />
        </Route>
        <Route path="/api/editReport/:id" exact>
          <EditReport />
        </Route>
        <Redirect to="/api/Reports" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/api/signup" exact>
          <Signup />
        </Route>
        <Route path="/api/login" exact>
          <Login />
        </Route>
        <Redirect to="/api/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
      setAdmin: setAdmin,
      login: login,
      logout: logout,
    }}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
    
  );
}

export default App;
