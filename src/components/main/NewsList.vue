<script setup>
import { ref } from "vue";
import NewsCard from "./news/NewsCard.vue";

const id = ref(0);

const newsList = ref([
  {
    id: id.value++,
    title: "News1",
    subTitle: "subTitle1",
    viewCount: 231,
    writeTime: "Mon, Dec 19",
  },
  {
    id: id.value++,
    title: "News2",
    subTitle: "subTitle2",
    viewCount: 312,
    writeTime: "Mon, Dec 20",
  },
  {
    id: id.value++,
    title: "News3",
    subTitle: "subTitle3",
    viewCount: 313,
    writeTime: "Mon, Dec 21",
  },
]);
</script>

<template>
  <div class="container mb-2 mt-3">
    <div class="row align-items-center">
      <div class="col-auto"><img src="@/assets/icons/icon-news.png" width="30px" /></div>
      <div class="col-auto p-0"><h2>News</h2></div>
    </div>
  </div>
  <div class="row">
    <NewsCard v-for="newsInfo in newsList" :key="newsInfo.id" :newsInfo="newsInfo" />
  </div>
</template>

<style scoped></style>
