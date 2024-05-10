<script setup>
import NewsCard from "./news/NewsCard.vue";
</script>

<template>
  <div class="container mb-2 mt-3">
    <div class="row align-items-center">
      <div class="col-auto"><img src="@/assets/icons/icon-news.png" width="30px" /></div>
      <div class="col-auto p-0"><h2>News</h2></div>
    </div>
  </div>
  <div class="row">
    <NewsCard />
    <NewsCard />
    <NewsCard />
  </div>
</template>

<style scoped></style>
