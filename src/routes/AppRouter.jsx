import { useAppContext } from "@/context/AppContext";
import HomePage from "@/pages/home-page/HomePage";
import LoginPage from "@/pages/login/LoginPage";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

const AppRouter = ({ user, signOut }) => {
  const { setUser, setSignout } = useAppContext();

  useEffect(() => {
    setUser(user);
    setSignout(() => signOut);
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRouter;
