<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PostCard from "./PostCard.vue";
import Cookies from "js-cookie";

const posts = ref([]);
const { VITE_APP_API_POST } = import.meta.env;

onMounted(() => {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);
  axios
    .get(VITE_APP_API_POST, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      posts.value = response.data;
      console.log(posts.value);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
});
</script>

<template>
  <div>
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<style scoped></style>
