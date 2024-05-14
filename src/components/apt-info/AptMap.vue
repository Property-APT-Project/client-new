<script setup>
import FocusedMap from "@/components/common/FocusedMap.vue";

import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
};
</script>

<template>
  <div class="body-wrapper col-lg-9 col-md-8 col-sm-12 m-0 ps-0 pe-0" style="height: 100%">
    <div class="ms-0 me-0" style="width: 100%; height: 100%">
      <div
        class="row align-items-stretch justify-content-center h-100"
        style="width: 100%; height: 100%"
      >
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
