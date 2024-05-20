import Cookies from "js-cookie";
import apiClient from "@/services/axios";

export const getToken = () => {
  return Cookies.get("authToken");
};

export const setToken = (token) => {
  Cookies.set("authToken", token, {
    expires: 7,
    sameSite: "strict",
  });
  const parsedToken = JSON.parse(token);
  console.log(parsedToken);
  apiClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${parsedToken.accessToken}`;
};

export const removeToken = () => {
  Cookies.remove("authToken");
  delete apiClient.defaults.headers.common["Authorization"];
};
