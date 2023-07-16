import React, { useState } from "react";
import AuthContext from "./Auth-Context";

const AuthProvider = (props) => {
    const [idToken, setIdToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

  const addToken = (idToken, refreshToken) => {
    setIdToken(idToken);
    setRefreshToken(refreshToken);
  };

  const removeToken = () => {
    setIdToken('');
    setRefreshToken('');
  };

  const authContext = React.createContext({
    idToken: idToken,
    refreshToken: refreshToken,
    addToken: addToken,
    removeToken: removeToken,
  });
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
