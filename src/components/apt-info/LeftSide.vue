<script setup>
import { ref, watch, toRef } from "vue";
import axios from "axios";

import AptSale from "@/components/apt-info/sales/AptSale.vue";
import AptComplex from "@/components/apt-info/sales/AptComplex.vue";
import MiniSearchBar from "../common/MiniSearchBar.vue";

let id = 0;
const activeSale = ref(false);
const activeComplex = ref(true);

const currInfo = ref(null);
const dealInfo = ref(null);

const complexInterestList = ref([]);

const props = defineProps({
  saleList: Object,
  complexList: Object,
  interestSaleList: Object,
  interestComplexList: Object,
  nonInterestSaleList: Object,
  nonInterestComplexList: Object
})

console.log(props);

const aptInterestList = ref([]);
const aptNonInterestList = ref([]);

const isSelectComplex = ref(false);

const activateSale = () => {
  activeSale.value = true;
  isSelectComplex.value = false;
  activeComplex.value = false;
};

const activateComplex = () => {
  activeSale.value = false;
  isSelectComplex.value = false;
  activeComplex.value = true;
};

const aptName = ref("");
const selectedAptList = ref([]);
// selectedAptList = saleList.value.filter((apt) => apt.aptName == aptName.value);

const emit = defineEmits(["selectLat", "selectLng", "dealInfo"]);

watch(dealInfo, (newInfo, prevInfo) => {
  emit("dealInfo", dealInfo.value);
  console.log("dealInfo", dealInfo.value);
})

watch(currInfo, (newInfo, prevInfo) => {
  console.log(newInfo);
  isSelectComplex.value = true;
  activeSale.value = true;
  activeComplex.value = false;


  aptName.value = newInfo.aptName;

  emit("selectLat", newInfo.lat);
  emit("selectLng", newInfo.lng);

  const path = "http://localhost:8080/where-is-my-home/api/v1";

  axios.get(path + `/house-info/sale-articles/complex/${newInfo.aptName}?dongCode=${newInfo.dongCode.substr(0, 8)}`, {

  }).then((response) => {
    selectedAptList.value = response['data'];

  }).catch((response) => {
    console.log('매물 조회 실패');
  });
});


import { inject } from 'vue';

const toggleModal = inject('toggleModal');

const handleOpenModal = () => {
  toggleModal();
};

const changeSaleListState = (flag, info) => {
  if (!flag)
    return;

  const id = info.id;

  const index1 = props.interestSaleList.findIndex(item => item.id === id);
  const index2 = props.nonInterestSaleList.findIndex(item => item.id === id);
  console.log("index", index1, index2)
  if (index1 !== -1) {
    props.interestSaleList.splice(index1, 1);
    props.nonInterestSaleList.push(info);
  }
  else if (index2 !== -1) {
    props.nonInterestSaleList.splice(index2, 1);
    props.interestSaleList.push(info);
  }

  console.log(info);



}

const changeComplexListState = (flag, info) => {
  if (!flag)
    return;

  const aptName = info.aptName;

  const index1 = props.interestComplexList.findIndex(item => item.aptName === aptName);
  const index2 = props.nonInterestComplexList.findIndex(item => item.aptName === aptName);
  console.log("index", index1, index2)
  if (index1 !== -1) {
    props.interestComplexList.splice(index1, 1);
    props.nonInterestComplexList.push(info);
  }
  else if (index2 !== -1) {
    props.nonInterestComplexList.splice(index2, 1);
    props.interestComplexList.push(info);
  }

  console.log(info);



}


</script>

<template>
  <div class="body-wrapper col-lg-3 col-md-4 col-sm-12 m-0 pe-3 bg-light h-100">
    <div class="container-fluid h-100">
      <mini-search-bar />
      <nav class="tap">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <button :class="{ 'nav-link': true, active: activeSale }" @click="activateSale">
              매물
            </button>
          </li>
          <li class="nav-item">
            <button :class="{ 'nav-link': true, active: activeComplex }" @click="activateComplex">
              아파트 단지
            </button>
          </li>
        </ul>
      </nav>
      <div class="sidebar-nav scrollspy-example me-2" style="overflow: scroll; height: 80%;">
        <ul id="sidebarnav">
          <li v-if="!isSelectComplex" class="nav-small-cap">
            <iconify-icon icon="solar:menu-dots-linear" class="nav-small-cap-icon fs-4"></iconify-icon>
            <span class="hide-menu">Interest</span>
          </li>
          <span v-if="isSelectComplex"> </span>
          <span v-else-if="activeSale">
            <apt-sale v-for="info in interestSaleList" 
            @isChanged="(flag) => changeSaleListState(flag, info)"
            :key="info.id" 
            :info="info" />
          </span>
          <span v-else>
            <apt-complex v-for="info in interestComplexList" @dealInfo="(info) => (dealInfo = info)"
              @response="(info) => (currInfo = info)" :key="info.aptName"
              @isChanged="(flag) => changeComplexListState(flag, info)" :info="info" />
          </span>

          <li v-if="!isSelectComplex">
            <span class="sidebar-divider lg"></span>
          </li>
          <li class="nav-small-cap">
            <iconify-icon icon="solar:menu-dots-linear" class="nav-small-cap-icon fs-4"></iconify-icon>
            <span class="hide-menu">LIST</span>
          </li>
          <span v-if="isSelectComplex">
            <apt-sale v-for="info in selectedAptList" 
            @isChanged="(flag) => changeSaleListState(flag, info)"
            :key="info.id" :info="info" />
          </span>
          <span v-else-if="activeSale"><apt-sale v-for="info in nonInterestSaleList" :key="info.id" :info="info"
            @isChanged="(flag) => changeSaleListState(flag, info)"  
            :interest="false" /></span>
          <span v-else>
            <apt-complex v-for="info in nonInterestComplexList" @dealInfo="(info) => (dealInfo = info)"
              @response="(info) => (currInfo = info)" @isChanged="(flag) => changeComplexListState(flag, info)"
              :key="info.aptName" :info="info" />
          </span>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
