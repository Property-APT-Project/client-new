<script setup>
import FocusedMap from "@/components/common/FocusedMap.vue";
import { ref, watch } from 'vue';
import axios from 'axios';
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
const { VITE_APP_DATA_SERVICE_KEY } = import.meta.env;

const map = ref();

const coordinate = ref({
  lat: 37.566826,
  lng: 126.9786567,
});

const saleList = ref([])
const complexList = ref([])
const complexDongGroupList = ref([])

const emit = defineEmits(['saleList', 'complexList'])

const path = "http://localhost:8080/where-is-my-home/api/v1";


function getAptSaleList(level, sLat, eLat, sLng, eLng) {
  if (level <= 5) {
    axios.get(path + `/house-info/sale-articles/location?sLat=${sLat}&eLat=${eLat}&sLng=${sLng}&eLng=${eLng}`, {

    }).then((response) => {
      saleList.value = response['data'];
      emit('saleList', saleList.value);

    }).catch((response) => {
      console.log('매물 조회 실패');
    });
  }
}

const commericalP1 = ref([])
function getCommericalDataP1(level, sLat, eLat, sLng, eLng) {
  if (level >= 5){
    commericalP1.value = [];
    return;
  }

  let numOfRows = 10;
  if (level <= 2)
    numOfRows = 15;

  const pathCommericalP1 = `https://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRectangle?ServiceKey=${VITE_APP_DATA_SERVICE_KEY}&pageNo=1&numOfRows=${numOfRows}&minx=${sLng}&miny=${sLat}&maxx=${eLng}&maxy=${eLat}&indsLclsCd=P1&type=json`

  axios.get(pathCommericalP1, {})
    .then((response) => {
      console.log(pathCommericalP1);
      console.log(response);

      if (response.data && response.data.body && response.data.body.items) {
        commericalP1.value = response['data']['body']['items'];
        console.log(commericalP1.value[0].bizesNm);
      }
    }).catch((response) => {
      console.log('매물 조회 실패');
    });
}

// 병원 정보 불러오기
const commericalQ1 = ref([])
function getCommericalDataQ1(level, sLat, eLat, sLng, eLng) {
  if (level >= 5){
    commericalQ1.value = [];
    return;
  }

  let numOfRows = 10;
  if (level <= 2)
    numOfRows = 15;

  const pathCommericalQ1 = `https://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRectangle?ServiceKey=${VITE_APP_DATA_SERVICE_KEY}&pageNo=1&numOfRows=${numOfRows}&minx=${sLng}&miny=${sLat}&maxx=${eLng}&maxy=${eLat}&indsLclsCd=Q1&type=json`

  axios.get(pathCommericalQ1, {})
    .then((response) => {
      console.log(pathCommericalQ1);
      console.log(response);

      if (response.data && response.data.body && response.data.body.items) {
        commericalQ1.value = response['data']['body']['items'];
        console.log(commericalQ1.value[0].bizesNm);
      }
    }).catch((response) => {
      console.log('매물 조회 실패');
    });
}


const commericalI2 = ref([])
function getCommericalDataI2(level, sLat, eLat, sLng, eLng) {
  if (level >= 5){
    commericalI2.value = [];
    return;
  }

  let numOfRows = 10;
  if (level <= 2)
    numOfRows = 15;

  const pathCommericalI2 = `https://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRectangle?ServiceKey=${VITE_APP_DATA_SERVICE_KEY}&pageNo=1&numOfRows=${numOfRows}&minx=${sLng}&miny=${sLat}&maxx=${eLng}&maxy=${eLat}&indsLclsCd=I2&type=json`

  axios.get(pathCommericalI2, {})
    .then((response) => {
      console.log(pathCommericalI2);
      console.log(response);

      if (response.data && response.data.body && response.data.body.items) {
        commericalI2.value = response['data']['body']['items'];
        console.log(commericalI2.value[0].bizesNm);
      }
    }).catch((response) => {
      console.log('매물 조회 실패');
    });
}



function getComplexList(level, sLat, eLat, sLng, eLng) {
  complexList.value = [];
  complexDongGroupList.value = [];

  console.log(sLat, eLat, sLng, eLng)

  if (level <= 4) {
    console.log(level)
    axios.get(path + `/house-info/complexes/location?sLat=${sLat}&eLat=${eLat}&sLng=${sLng}&eLng=${eLng}`, {

    }).then((response) => {
      complexList.value = response['data'];
      console.log(complexList.value[0]);
      emit('complexList', complexList.value);
    }).catch((response) => {
      console.log('단지 조회 실패');
    });
  }
  else if (level >= 6 && level <= 7) {
    axios.get(path + `/house-info/complexes/dong-group?sLat=${sLat}&eLat=${eLat}&sLng=${sLng}&eLng=${eLng}`, {

    }).then((response) => {
      complexDongGroupList.value = response['data'];
      console.log(complexList.value[0]);
    }).catch((response) => {
      console.log('단지 그룹 조회 실패');
    });
  }
}



const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  const mapTypeControl = new kakao.maps.MapTypeControl();
  // 지도 타입 컨트롤을 지도에 표시합니다
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  // 지도 중심좌표를 얻어옵니다  latlng.getLat() latlng.getLng()
  let latlng = map.value.getCenter();
  let level = map.value.getLevel();
  let bounds = map.value.getBounds();
  // 영역 남서쪽 좌표 swLatLng.getLat() swLatLng.getLng()
  let swLatLng = bounds.getSouthWest();
  // 영역의 북동쪽 좌표를 얻어옵니다
  let neLatLng = bounds.getNorthEast();

  console.log(map.value.getCenter().getLat());

  getAptSaleList(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
  getComplexList(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
  getCommericalDataP1(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
  getCommericalDataQ1(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
  getCommericalDataI2(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());



  kakao.maps.event.addListener(map.value, 'dragend', function (mouseEvent) {
    level = map.value.getLevel();
    bounds = map.value.getBounds();
    // 영역 남서쪽 좌표 swLatLng.getLat() swLatLng.getLng()
    swLatLng = bounds.getSouthWest();
    // 영역의 북동쪽 좌표를 얻어옵니다
    neLatLng = bounds.getNorthEast();

    console.log(level);
    getAptSaleList(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
    getComplexList(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
    getCommericalDataP1(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
    getCommericalDataQ1(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
    getCommericalDataI2(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());

  });

  kakao.maps.event.addListener(map.value, 'zoom_changed', function (mouseEvent) {
    level = map.value.getLevel();
    bounds = map.value.getBounds();
    // 영역 남서쪽 좌표 swLatLng.getLat() swLatLng.getLng()
    swLatLng = bounds.getSouthWest();
    // 영역의 북동쪽 좌표를 얻어옵니다
    neLatLng = bounds.getNorthEast();
    getAptSaleList(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
    getComplexList(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
    getCommericalDataP1(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
    getCommericalDataQ1(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
    getCommericalDataI2(level, swLatLng.getLat(), neLatLng.getLat(), swLatLng.getLng(), neLatLng.getLng());
  });
};
</script>

<template>
  <div class="body-wrapper col-lg-9 col-md-8 col-sm-12 m-0 ps-0 pe-0" style="height: 100%">
    <div class="ms-0 me-0" style="width: 100%; height: 100%">
      <div class="row align-items-stretch justify-content-center h-100" style="width: 100%; height: 100%">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" @onLoadKakaoMap="onLoadKakaoMap" :draggable="true"
          style="width: 100%; height: 100%">
          <!-- v-for을 사용하여 saleList의 각 요소에 대해 마커를 생성합니다. -->
          <KakaoMapMarker v-for="(item, index) in complexList" :key="index" :lat="item.lat" :lng="item.lng" :image="{
            imageSrc: '../../src/assets/icons/house-marker.png',
            imageWidth: 30,
            imageHeight: 30,
            imageOption: {}
          }"></KakaoMapMarker>
          <!-- <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker> -->

          <KakaoMapMarker v-for="(item, index) in commericalP1" :key="index" :lat="item.lat" :lng="item.lon" :image="{
            imageSrc: '../../src/assets/icons/book-marker.png',
            imageWidth: 30,
            imageHeight: 30,
            imageOption: {}
          }"></KakaoMapMarker>

          <KakaoMapMarker v-for="(item, index) in commericalQ1" :key="index" :lat="item.lat" :lng="item.lon" :image="{
            imageSrc: '../../src/assets/icons/hospital-marker.png',
            imageWidth: 30,
            imageHeight: 30,
            imageOption: {}
          }"></KakaoMapMarker>

          <KakaoMapMarker v-for="(item, index) in commericalI2" :key="index" :lat="item.lat" :lng="item.lon" :image="{
            imageSrc: '../../src/assets/icons/fork-marker.png',
            imageWidth: 30,
            imageHeight: 30,
            imageOption: {}
          }"></KakaoMapMarker>
        </KakaoMap>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
