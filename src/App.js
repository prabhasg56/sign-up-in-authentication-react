import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthProvider from "./store/Auth-Provider";
import { useContext } from "react";
import AuthContext from "./store/Auth-Context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/profile"
            element={!authCtx.isLoggedIn && <UserProfile />}
          />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
