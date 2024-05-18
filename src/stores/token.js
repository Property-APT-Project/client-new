import { defineStore } from "pinia";

export const useTokenStore = defineStore("token", {
  state: () => ({
    grantType: "",
    accessToken: "",
    refreshToken: "",
  }),
});
