import React, { useEffect } from "react";
import Routes from "./routes";
import ThemeCustomization from "./themes";
import ScrollTop from "./components/ScrollTop";
import { getRefreshToken } from "./services/auth.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { restoreAuth } from "./store/reducers/auth";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const refreshTokenIfNeeded = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      if (tokens) {
        const accessTokenExpires = new Date(tokens.access.expires);
        const currentDateTime = new Date();

        if (accessTokenExpires <= currentDateTime) {
          const response = await getRefreshToken({
            refresh_token: tokens.refresh.token,
          });

          const newTokens = {
            access: {
              token: response.access.token,
              expires: response.access.expires,
            },
            refresh: {
              token: response.refresh.token,
              expires: response.refresh.expires,
            },
          };
          localStorage.setItem("tokens", JSON.stringify(newTokens));
        }
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const checkAuthToken = () => {
    const accessToken = JSON.parse(localStorage.getItem("tokens"))?.access
      ?.token;

    if (!accessToken) {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    refreshTokenIfNeeded();
  }, []);

  useEffect(() => {
    checkAuthToken();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("tokens");
    if (storedUser && storedToken) {
      dispatch(
        restoreAuth({ user: JSON.parse(storedUser), tokens: storedToken })
      );
    }
  }, [dispatch]);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
