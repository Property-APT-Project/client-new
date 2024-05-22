import { defineStore } from "pinia";
import apiClient from "../services/axios";
import { getToken, setToken, removeToken } from "../utils/auth";

const { VITE_APP_LOGIN, VITE_APP_LOGOUT, VITE_APP_PROFILE } = import.meta.env;
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: getToken(),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isOwner: (state) => (id) => state.user && state.user.id === id,
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
      setToken(token);
    },
    login(credentials) {
      console.log(VITE_APP_LOGIN);
      return apiClient
        .post(VITE_APP_LOGIN, credentials)
        .then((response) => {
          const token = response.data;
          this.setToken(JSON.stringify(token));
          console.log(JSON.parse(getToken()));
          return apiClient.get(VITE_APP_PROFILE);
        })
        .then((userResponse) => {
          this.setUser(userResponse.data);
          console.log(userResponse.data);
        })
        .catch((error) => {
          console.error("Failed to login:", error);
          throw error;
        });
    },
    logout() {
      return apiClient
        .post(VITE_APP_LOGOUT, null)
        .then((response) => {
          console.log("로그아웃 완료");
          // this.setToken(null);
          this.setUser(null);
          removeToken();
        })
        .catch((error) => {
          throw error;
          // router.replace({ name: "community" });
        });
    },
    initialize() {
      const token = getToken();
      if (token) {
        this.setToken(token);
        apiClient
          .get("/user/me")
          .then((response) => {
            this.setUser(response.data);
          })
          .catch(() => {
            this.logout();
          });
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
