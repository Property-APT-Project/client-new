<script setup>
import { ref } from "vue";
import NewsCard from "./news/NewsCard.vue";
import axios from "axios";

const newsList = ref([]);

const path = "https://land.naver.com/news/airsList.naver?baseDate=2024-05-19&page=1&size=3";

const fetchNewsInfo = async () => {
  console.log('Fetching URL:', path);
 
  try {
    const response = await axios.get(path);
    console.log('API Response:', response);
    if (response.data) {
      console.log("response")
      newsList.value = response.data.list;
      console.log(newsList.value)
    } else {
      console.log('No data received');
    }
  } catch (error) {
    console.error('뉴스 조회 실패:', error.response ? error.response.data : error.message);
  }
};
fetchNewsInfo();

</script>

<template>
  <div class="container mb-4 mt-1">
    <div class="row align-items-center mt-3">
      <div class="col-auto"><img src="@/assets/icons/icon-news.png" width="30px" /></div>
      <div class="col-auto p-0"><h2>News</h2></div>
    </div>
  </div>
  <div class="row mb-3">
    <NewsCard v-for="newsInfo in newsList" :key="newsInfo.articleId" :newsInfo="newsInfo" />
  </div>
</template>

<style scoped></style>
