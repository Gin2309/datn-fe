import React, { useEffect } from "react";
import { useRoutes, Navigate, useNavigate } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";

const ThemeRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = JSON.parse(localStorage.getItem("tokens"))?.access
      ?.token;
    const refresh_token = JSON.parse(localStorage.getItem("tokens"))?.refresh
      ?.token;

    if (!refresh_token && !access_token) {
      navigate("/login", { replace: true });
    }
  }, []);

  return useRoutes([
    { path: "/", element: <Navigate to="/login" /> },
    MainRoutes,
    LoginRoutes,
  ]);
};

export default ThemeRoutes;
