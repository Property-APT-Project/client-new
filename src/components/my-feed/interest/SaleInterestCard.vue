<script setup>
import FocusedMap from "@/components/common/FocusedMap.vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
const coordinate = {
  lat: 37.537547,
  lng: 127.010049,
};

const props = defineProps({
  sale: Object
});

</script>

<template>
  <div class="card h-50" style="width: 100%;">
    <!-- <div class="card-body"> -->
    <div class="row card-body" style="width: 100%; padding: 0; margin-left: 0;">
      <div class="col-6 p-0 m-0">
        <img v-if="sale.img1 != '@/assets/images/no-images.jpeg'" :src="sale.img1" width="100%" height="100%"/>
        <img v-else src="@/assets/images/no-image.jpeg" width="100%" height="100%"/>
      </div>
      <div class="col-6 p-0 m-0">
        <KakaoMap
      :lat="sale.lat"
      :lng="sale.lng"
      :draggable="true"
      level="5"
      style="height: 200px"
      class="w-100"
    >
      <KakaoMapMarker
        :lat="sale.lat"
        :lng="sale.lng"
      ></KakaoMapMarker>
    </KakaoMap>
      </div>
    </div>
    

    <!-- </div> -->
    <div class="row card-body pt-3 pb-3" style="width: 100%; padding: 0; margin-left: 0;">
      <h5 class="card-title text-center">{{ sale.aptName }}</h5>
      <p class="card-text text-info text-center">{{ sale.description }}</p>
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
