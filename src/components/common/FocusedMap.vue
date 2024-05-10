<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
};
</script>

<template>
  <div class="row">
    <div class="col-lg-12 d-flex align-items-stretch">
      <div class="card w-100">
        <div class="card-body p-4">
          <h5 class="card-title fw-semibold mb-4">Map</h5>
          <div class="container-fluid">
            <div class="row align-items-stretch justify-content-center">
              <KakaoMap
                :lat="coordinate.lat"
                :lng="coordinate.lng"
                :draggable="true"
                style="width: 100%"
              >
                <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
              </KakaoMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
