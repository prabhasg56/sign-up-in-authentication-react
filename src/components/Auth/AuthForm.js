import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const email = useRef("");
  const password = useRef("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const authHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredUser = email.current.value;
    const enteredPassword = password.current.value;

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHg3icjrRbCcrwXkQZPXfPCutfZg-Bm0Y";
    } else {
      url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHg3icjrRbCcrwXkQZPXfPCutfZg-Bm0Y";
    }

    try {
      const response = await fetch(url,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredUser,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response)
      if (response.ok) {
        alert("Welcome! Your account successfully created");
      } else {
        const responseJson = await response.json();

        throw new Error(responseJson.error.message);
      }
    } catch (error) {
      alert(error);
    }

    email.current.value = "";
    password.current.value = "";

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={authHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={email} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={password} required />
        </div>
        <div className={classes.actions}>
          <button> {isLogin ? "Login" : "Create account"}</button>
          {isLoading && <p style={{ color: "white" }}>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
