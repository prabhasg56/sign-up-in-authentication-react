import React, { useState } from "react";
import AuthContext from "./Auth-Context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [idToken, setIdToken] = useState(initialToken);
  const [refreshToken, setRefreshToken] = useState(null);

  const userIsLoggedIn = !!idToken // "prabhas" return true, and if "" return false
  console.log(userIsLoggedIn)

  const loginHandler = (idToken, refreshToken) => {
    setIdToken(idToken);
    localStorage.setItem('token', idToken);
    setRefreshToken(refreshToken);
  };

  const logoutHandler = () => {
    setIdToken(null);
    localStorage.removeItem('token');
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
