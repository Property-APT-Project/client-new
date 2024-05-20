<script setup>
components: {
  GraphVue;
}
import PhotoGroupVue from "@/components/apt-detail/apt-photo/PhotoGroup.vue";
import DetailVue from "@/components/apt-detail/Detail.vue";
import GraphVue from "@/components/apt-detail/GraphVue.vue";
import RankList from "@/components/main/RankList.vue";
import PriceVue from "@/components/apt-detail/Price.vue";
import SaleDetailVue from "@/components/apt-detail/SaleDetail.vue";
import FocusedMap from "@/components/common/FocusedMap.vue";
import DealSideBar from "@/components/apt-detail/DealSideBar.vue";
import { useRoute } from 'vue-router';
import axios from "axios";
import { ref, onMounted } from "vue";

const route = useRoute();
const saleInfo = JSON.parse(route.query.info);
const complexInfo = ref([]);

onMounted(async () => {
  await fetchComplexInfo(); // fetchComplexInfo 함수를 비동기로 호출하여 응답을 기다립니다.
});


console.log(saleInfo); // info 객체 사용

console.log(saleInfo.aptName);
console.log(saleInfo.dongCode);

const saleOne = ref([])
saleOne.value.push(saleInfo);

console.log(saleOne.value);


const fetchComplexInfo = async () => {
  const path = `http://localhost:8080/where-is-my-home/api/v1/house-info/complexes/detail-info/${saleInfo.aptName}?dongCode=${saleInfo.dongCode}00`;

  console.log('Fetching URL:', path);
 
  try {
    const response = await axios.get(path);
    console.log('API Response:', response);
    if (response.data && response.data.length > 0) {
      complexInfo.value = response.data[0];
      console.log("response")
      console.log(complexInfo.value);
    } else {
      console.log('No data received');
    }
  } catch (error) {
    console.error('매물 조회 실패:', error.response ? error.response.data : error.message);
  }
};
fetchComplexInfo();


</script>

<template>
  <div class="body-wrapper ms-0 me-0">
    <div class="body-wrapper-inner mb-6 container-fluid w-100">
      <div class="row">
        <div class="col-12">
          <PhotoGroupVue :saleInfo="saleOne" :complex="complexInfo" />
        </div>
        
      </div>
      

      <div class="row" style="margin-right: 0; padding-right: 0; padding-left: 0;">
        <div class="row col-lg-8 d-flex align-items-stretch" style="margin-right: 0; margin-left: 0; padding-left: 0; padding-right: 0;">
          <div class="col-12">
            <FocusedMap />
          </div>
          <div class="col-12" style="padding-right: 0;">
            <DetailVue :complex="complexInfo" />
          </div>
          <div class="col-12"  style="padding-right: 0;">
            <SaleDetailVue :sale="saleOne" :complex="complexInfo" />
          </div>
          <div class="col-12"  style="padding-right: 0;"><graph-vue /></div>

          <div class="col-12"  style="padding-right: 0;">
            <PriceVue />
          </div>
        </div>
        <div class="row col-lg-4 d-flex align-items-stretch" style="height: 100%; margin: 0; padding-right: 0;">
          <DealSideBar/>


        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
