<script setup>
import FocusedMap from "@/components/common/FocusedMap.vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
const coordinate = {
  lat: 37.53391,
  lng: 126.9775,
};
</script>

<template>
  <div class="card h-50">
    <!-- <div class="card-body"> -->
    <KakaoMap
      :lat="coordinate.lat"
      :lng="coordinate.lng"
      :draggable="true"
      level="7"
      style="height: 200px"
      class="w-100"
    >
    </KakaoMap>

    <!-- </div> -->
    <div class="card-body">
      <h5 class="card-title text-center">서울특별시 용산구</h5>
      <p class="card-text text-info text-center">아파트 이사 지역</p>
    </div>
    <!-- <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div> -->
  </div>
</template>

<style scoped>
.map-container {
  position: relative;
  padding-bottom: 40%; /* 부모 요소의 높이를 카드의 40%로 설정 */
}
</style>
