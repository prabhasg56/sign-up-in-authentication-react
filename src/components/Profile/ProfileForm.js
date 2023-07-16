import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/Auth-Context";
import { useContext, useRef } from "react";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);

  const changePasswordHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDHg3icjrRbCcrwXkQZPXfPCutfZg-Bm0Y",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx._currentValue.idToken,
            password: newPasswordRef.current.value,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseJson = await response.json();

      if (response.ok) {
        alert("Your password successfully changed!");
      } else {
        throw new Error(responseJson.error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength={7} ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
