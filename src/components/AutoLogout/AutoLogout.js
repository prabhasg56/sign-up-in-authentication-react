import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/Auth-Context";

const AutoLogout = () => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const AUTO_LOGOUT_TIME = 30000;
  let logoutError;
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const resetActivityTimer = () => {
      setLastActivity(Date.now());
      console.log("pk" + lastActivity);
    };

    //add event listeners
    document.addEventListener("mousemove", resetActivityTimer);
    document.addEventListener("keydown", resetActivityTimer);

    // Clear the event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", resetActivityTimer);
      document.removeEventListener("keydown", resetActivityTimer);
    };
  }, []);

  const checkUserInactivity = () => {
    const currentTime = Date.now();
    const timeSinceLastActivity = currentTime - lastActivity;

    if (timeSinceLastActivity > AUTO_LOGOUT_TIME) {
      localStorage.clear("token");
      logoutError = "Time out! Please login again";
      alert(logoutError);
      authCtx._currentValue.logout();
    }
  };

  useEffect(() => {
    const checkInactivityInterval = setInterval(checkUserInactivity, 1000);
    return () => {
      clearInterval(checkInactivityInterval);
    };
  }, [lastActivity]);
};

export default AutoLogout;
