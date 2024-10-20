import { getRefreshToken } from "../services/auth.api";

const store = typeof window !== "undefined" ? window.localStorage : null;

export const setItem = (key, value) => {
  store?.setItem(key, value);
};

export const getItem = (key) => {
  const value = store?.getItem(key);
  return value === null ? "" : value;
};

export const setToken = (value) => {
  setItem("ACCESS_TOKEN", value);
};

export const getToken = () => getItem("ACCESS_TOKEN");

export const clearToken = () => setToken("");

export const setRefreshToken = (value) => {
  setItem("REFRESH_TOKEN", value);
};

export const getRefreshToken = () => getItem("REFRESH_TOKEN");

export const clearRefreshToken = () => setRefreshToken("");
