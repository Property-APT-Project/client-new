import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";

const { VITE_APP_API_POST, VITE_APP_API_NEW_POST } = import.meta.env;

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
  }),
  actions: {
    fetchPosts() {
      return axios
        .get(VITE_APP_API_POST)
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    },
    addPost(newPost) {
      const tokenCookie = Cookies.get("authToken");
      const token = JSON.parse(tokenCookie);
      return axios
        .post(VITE_APP_API_NEW_POST, newPost, {
          headers: {
            Authorization: "Bearer " + token.accessToken,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.posts.unshift(response.data);
          this.posts.sort(
            (a, b) => new Date(b.createTime) - new Date(a.createTime)
          ); // 최신순으로 정렬
          console.log(this.posts);
        })
        .catch((error) => {
          console.error("Error adding post:", error);
        });
    },
  },
});
