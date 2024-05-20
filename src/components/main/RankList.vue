<script setup>
import { ref } from "vue";
import FocusedMap from "../common/FocusedMap.vue";
import RankApt from "./rank/RankApt.vue";
import axios from "axios";

const cityName = ref("서울시 강서구");
const id = ref(0);
const nameList = ref([
  { id: id.value++, aptName: "자이" },
  { id: id.value++, aptName: "래미안" },
  { id: id.value++, aptName: "힐스테이트" },
]);

const path = "https://land.naver.com/news/airsList.naver?baseDate=2024-05-19&page=1&size=3";


const fetchNewsInfo = async () => {
  console.log('Fetching URL:', path);
 
  try {
    const response = await axios.get(path);
    console.log('API Response:', response);
    if (response.data) {
      console.log("response")
      console.log(response.data.list)
    } else {
      console.log('No data received');
    }
  } catch (error) {
    console.error('뉴스 조회 실패:', error.response ? error.response.data : error.message);
  }
};

const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
};

fetchNewsInfo();

</script>

<template>
  <div class="container mb-6 mt-3">
    <div class="row align-items-center">
      <div class="col-auto"><img src="@/assets/icons/icon-ranking-title.png" width="40px" /></div>
      <div class="col-auto p-0">
        <h2>
          {{ cityName }} <span><b>Top3</b></span>
        </h2>
      </div>
    </div>
  </div>
  <div class="row mt-3 mb-3">
    <div class="col-lg-12">
      <div class="row">
        <RankApt v-for="aptInfo in nameList" :key="aptInfo.id" :aptInfo="aptInfo" />
      </div>
    </div>
  </div>
  <FocusedMap :lat="coordinate.lat" :lng="coordinate.lng" />
</template>

<style scoped></style>
