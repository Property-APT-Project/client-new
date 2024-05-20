<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PostCard from "./PostCard.vue";
import { usePostStore } from "@/stores/post";
import Cookies from "js-cookie";

const posts = ref([]);
const { VITE_APP_API_POST } = import.meta.env;

const postStore = usePostStore();

onMounted(() => {
  postStore.fetchPosts();
});
const fetchPosts = () => {
  axios
    .get(VITE_APP_API_POST)
    .then((response) => {
      posts.value = response.data;
      console.log(posts.value);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div
        class="d-flex justify-content-center col-xxl-7 col-xl-7 col-lg-8 col-md-9 col-sm-10"
        v-for="post in postStore.posts"
        :key="post.id"
      >
        <PostCard :post="post" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 20px;
}

@media (min-width: 1200px) {
  .card {
    max-width: 900px; /* 카드의 최대 너비 설정 */
    margin-left: auto;
    margin-right: auto;
  }
}

@media (min-width: 1400px) {
  .card {
    max-width: 800px; /* 카드의 최대 너비를 더 작게 설정 */
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
