import React, { useEffect, useState } from "react";

const AutoLogout = () => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const AUTO_LOGOUT_TIME = 30000;
  let logoutError;

  useEffect(() => {
    const resetActivityTimer = () => {
      setLastActivity(Date.now());
    };

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

    if(timeSinceLastActivity > AUTO_LOGOUT_TIME){
        localStorage.clear('token');
        logoutError = 'Time out! Please login again';
    }
  }

  useEffect(() => {
    const checkInactivityInterval = setInterval(checkUserInactivity, 1000);
  
    return () => {
      clearInterval(checkInactivityInterval);
    };
  }, []);
  

  return <div>
    <p>{logoutError}</p>
  </div>;
};

export default AutoLogout;
