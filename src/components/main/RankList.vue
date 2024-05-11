<script setup>
import { ref } from "vue";
import FocusedMap from "../common/FocusedMap.vue";
import RankApt from "./rank/RankApt.vue";

const cityName = ref("서울시 강서구");
const id = ref(0);
const nameList = ref([
  { id: id.value++, aptName: "자이" },
  { id: id.value++, aptName: "래미안" },
  { id: id.value++, aptName: "힐스테이트" },
]);
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
  <FocusedMap />
</template>

<style scoped></style>
