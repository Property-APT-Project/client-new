<script setup>
import FocusedMap from "@/components/common/FocusedMap.vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
const coordinate = {
  lat: 37.537547,
  lng: 127.010049,
};
</script>

<template>
  <div class="card h-50">
    <!-- <div class="card-body"> -->
    <KakaoMap
      :lat="coordinate.lat"
      :lng="coordinate.lng"
      :draggable="true"
      level="5"
      style="height: 200px"
      class="w-100"
    >
      <KakaoMapMarker
        :lat="coordinate.lat"
        :lng="coordinate.lng"
      ></KakaoMapMarker>
    </KakaoMap>

    <!-- </div> -->
    <div class="card-body">
      <h5 class="card-title text-center">한남더힐</h5>
      <p class="card-text text-info text-center">아파트 후보 리스트 1</p>
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
