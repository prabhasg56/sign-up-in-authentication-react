import React from "react";

const AuthContext = React.createContext({
    idToken : '',
    refreshToken : '',
    addToken: (idToken, refreshToken) => {},
    removeToken: (idToken, refreshToken) => {}
})

export default AuthContext;