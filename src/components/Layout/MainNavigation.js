import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/Auth-Context";
import { useContext, useState } from "react";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const removeToken = () => {
    authCtx._currentValue.logout();
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx._currentValue.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {authCtx._currentValue.isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {authCtx._currentValue.isLoggedIn && (
            <li>
              <button onClick={() => removeToken()}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
