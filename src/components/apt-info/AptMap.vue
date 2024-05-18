<script setup>
import FocusedMap from "@/components/common/FocusedMap.vue";
import { ref, watch } from 'vue';
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";

const map = ref();

const coordinate = ref({
  lat: 37.566826,
  lng: 126.9786567,
});

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  const mapTypeControl = new kakao.maps.MapTypeControl();
  // 지도 타입 컨트롤을 지도에 표시합니다
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  kakao.maps.event.addListener(map.value, 'dragend', function (mouseEvent) {

    // 지도 중심좌표를 얻어옵니다  latlng.getLat() latlng.getLng()
    var latlng = map.value.getCenter();

    const level = map.value.getLevel();

    const bounds = map.value.getBounds();

    // 영역 남서쪽 좌표 swLatLng.getLat() swLatLng.getLng()
    const swLatLng = bounds.getSouthWest();
    // 영역의 북동쪽 좌표를 얻어옵니다
    const neLatLng = bounds.getNorthEast();
 
    console.log(level);



  });
};




</script>

<template>
  <div class="body-wrapper col-lg-9 col-md-8 col-sm-12 m-0 ps-0 pe-0" style="height: 100%">
    <div class="ms-0 me-0" style="width: 100%; height: 100%">
      <div class="row align-items-stretch justify-content-center h-100" style="width: 100%; height: 100%">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" @onLoadKakaoMap="onLoadKakaoMap" :draggable="true"
          style="width: 100%; height: 100%">
          <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
        </KakaoMap>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
