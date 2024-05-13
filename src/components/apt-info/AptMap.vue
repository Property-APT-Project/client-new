<script setup>
import FocusedMap from "@/components/common/FocusedMap.vue";

import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
};
</script>

<template>
  <div class="body-wrapper col-6 m-0 ps-0 pe-0" style="height: 1000px">
    <div class="container-fluid h-100">
      <div class="row align-items-stretch justify-content-center h-100">
        <KakaoMap
          :lat="coordinate.lat"
          :lng="coordinate.lng"
          :draggable="true"
          style="width: 100%; height: 100%"
        >
          <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
        </KakaoMap>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
