import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from '../store/Auth-Context';
import { useContext, useState } from 'react';

const MainNavigation = () => {
  const [showProfileLogin, setShowProfileLogin] = useState(false);

  const authCtx = useContext(AuthContext);

  const removeToken = () => {
      authCtx._currentValue.removeToken();
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            {!showProfileLogin && <Link to='/auth'>Login</Link>}
          </li>
          <li>
            {showProfileLogin && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
            {showProfileLogin && <button onClick={() => removeToken()}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
