<script setup>
import FocusedMap from "@/components/common/FocusedMap.vue";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
const coordinate = {
  lat: 37.537547,
  lng: 127.010049,
};

const props = defineProps({
  complex: Object
});

import { ref } from 'vue';
import { useRouter } from 'vue-router';

  const router = useRouter();

  const navigateToAptMap = () => {
    router.push({ name: 'aptKeyword', params: { keyword: props.complex.interestId } });
  };

</script>

<template>
  <div class="card h-50" style="width: 100%;">
    <!-- <div class="card-body"> -->
    <div class="row card-body" style="width: 100%; padding: 0; margin-left: 0;">
      <div class="col-12 p-0 m-0">
        <KakaoMap
      :lat="complex.lat"
      :lng="complex.lng"
      :draggable="true"
      level="5"
      style="height: 200px"
      class="w-100"
    >
      <KakaoMapMarker
        :lat="complex.lat"
        :lng="complex.lng"
      ></KakaoMapMarker>
    </KakaoMap>
      </div>
    </div>
    

    <!-- </div> -->
    <div class="row card-body pt-3 pb-3" style="width: 100%; padding: 0; margin-left: 0; cursor: pointer;" @click="navigateToAptMap">
      <h5 class="card-title text-center">{{ complex.interestId}}</h5>
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
