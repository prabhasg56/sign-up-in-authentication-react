import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthContext from "./store/Auth-Context";
import AutoLogout from "./components/AutoLogout/AutoLogout";

function App() {
  const authCtx = useContext(AuthContext);
  console.log("pk " + authCtx._currentValue.isLoggedIn);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={
            !authCtx._currentValue.isLoggedIn ? <AuthPage /> : <HomePage />
          }
        />
        <Route
          path="/profile"
          element={
            authCtx._currentValue.isLoggedIn ? <UserProfile /> : <HomePage />
          }
        />
        <Route path="/*" element={<HomePage />} />
      </Routes>
      {authCtx._currentValue.isLoggedIn && <AutoLogout />}
    </Layout>
  );
}

export default App;
