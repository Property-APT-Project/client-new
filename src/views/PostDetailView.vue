<script setup>
import PostDetail from "@/components/community/PostDetail.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const postId = ref(Number(route.params.id));
</script>

<template>
  <div class="body-wrapper ms-0 me-0">
    <div class="body-wrapper-inner mb-6 container-fluid w-100">
      <PostDetail :postId="postId" />
    </div>
  </div>
</template>

<style scoped></style>
