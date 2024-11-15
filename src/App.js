import React, { useEffect } from "react";
import Routes from "./routes";
import ThemeCustomization from "./themes";
import ScrollTop from "./components/ScrollTop";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { restoreAuth } from "./store/reducers/auth";

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkAuthToken = () => {
    const accessToken = JSON.parse(localStorage.getItem("tokens"));

    if (!accessToken) {
      navigate("/login", { replace: true });
    }
  };

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
