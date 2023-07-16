import React, { useState } from "react";
import AuthContext from "./Auth-Context";

const AuthProvider = (props) => {
  const [idToken, setIdToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const userIsLoggedIn = !!idToken; // "prabhas" return true, and if "" return false

  const loginHandler = (idToken, refreshToken) => {
    setIdToken(idToken);
    localStorage.setItem('token', idToken);
    setRefreshToken(refreshToken);
  };

  const logoutHandler = () => {
    setIdToken(null);
    localStorage.clear('token');
    setRefreshToken(null);
  };

  const authContext = React.createContext({
    idToken: idToken,
    refreshToken: refreshToken,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  });
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
