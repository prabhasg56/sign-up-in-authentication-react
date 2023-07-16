import React from "react";

const AuthContext = React.createContext({
    idToken : '',
    refreshToken : '',
    isLoggedIn : false,
    login: (idToken, refreshToken) => {},
    logout: () => {}
})

export default AuthContext;