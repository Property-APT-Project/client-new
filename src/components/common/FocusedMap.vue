<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";

import { ref, watch } from 'vue';

const map = ref();
const props = defineProps({
  lat: String,
  lng: String
});

watch(map, (newInfo, prevInfo) => {
  getInfo()
});

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  const mapTypeControl = new kakao.maps.MapTypeControl();
  // 지도 타입 컨트롤을 지도에 표시합니다
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  kakao.maps.event.addListener(map.value, 'dragend', function (mouseEvent) {        
    
    // 지도 중심좌표를 얻어옵니다 
    var latlng = map.value.getCenter(); 
    
    var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';
    console.log(message)

    const level = map.value.getLevel();

    const swLatLng = bounds.getSouthWest();
// 영역의 북동쪽 좌표를 얻어옵니다
const neLatLng = bounds.getNorthEast();
    
  });
};
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
};


const getInfo = () => {
  if (map.value) {
    // 지도의 현재 중심좌표를 얻어옵니다
    const center = map.value.getCenter();

    // 지도의 현재 레벨을 얻어옵니다
    const level = map.value.getLevel();

    // 지도타입을 얻어옵니다
    const mapTypeId = map.value.getMapTypeId();

    // 지도의 현재 영역을 얻어옵니다
    const bounds = map.value.getBounds();

    // 영역의 남서쪽 좌표를 얻어옵니다
    const swLatLng = bounds.getSouthWest();

    // 영역의 북동쪽 좌표를 얻어옵니다
    const neLatLng = bounds.getNorthEast();

    // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
    const boundsStr = bounds.toString();
    let message = "";
    message = `지도 중심좌표는 위도 ${center.getLat()} <br>`;
    message += `경도 ${center.getLng()} 이고 <br>`;
    message += `지도 레벨은 ${level} 입니다 <br>`;
    message += `지도 타입은 ${mapTypeId} 이고 <br> `;
    message += `지도의 남서쪽 좌표는 ${swLatLng.getLat()}, ${swLatLng.getLng()}이고 <br>`;
    message += `북동쪽 좌표는 ${neLatLng.getLat()}, ${neLatLng.getLng()}입니다`;

    console.log(message);
  }
};
</script>

<template>
  <div class="row">
    <div class="col-lg-12 d-flex align-items-stretch" style="padding-right: 0;">
      <div class="card w-100">
        <div class="card-body p-4">
          <h5 class="card-title fw-semibold mb-4">지도</h5>
          <div class="container-fluid">
            <div class="row align-items-stretch justify-content-center">
              <KakaoMap :lat="lat" :lng="lng" @onLoadKakaoMap="onLoadKakaoMap" :draggable="true" style="width: 100%">
                <KakaoMapMarker :lat="lat" :lng="lng" ></KakaoMapMarker>
              </KakaoMap>


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
