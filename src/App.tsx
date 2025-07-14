import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/auth/Auth_Context";

// layout
const App_Layout = lazy(() => import("./layout/App_Layout"));

//404
const Page_Not_Found = lazy(() => import("./pages/404/Page_Not_Found"));

// account
const Unauth_Layout = lazy(() => import("./layout/Unauth_Layout"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Otp = lazy(() => import("./pages/auth/Otp"));
const Forget_Password = lazy(() => import("./pages/auth/Forget_Password"));
const Reset_Password = lazy(() => import("./pages/auth/Reset_Password"));

const App = () => {
  const { user, token } = useAuth();
  return (
    <Routes>
      {!token && (
        <Route path="account" element={<Unauth_Layout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path=":email/activate" element={<Otp />} />
          <Route path=":email/forget-password" element={<Otp />} />
          <Route path="forget-password" element={<Forget_Password />} />
          <Route path=":email/reset-password" element={<Reset_Password />} />
        </Route>
      )}
      <Route path="/" element={<App_Layout />}>
        <Route path="*" element={<Page_Not_Found />} />
      </Route>
    </Routes>
  );
};

export default App;
