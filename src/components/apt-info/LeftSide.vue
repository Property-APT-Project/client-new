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
  saleList:Array,
  complexList:Array,
})

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

watch(dealInfo, (newInfo, prevInfo)=>{
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

  axios.get(path+`/house-info/sale-articles/complex/${newInfo.aptName}?dongCode=${newInfo.dongCode.substr(0, 8)}`,{

  }).then((response) =>{
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
      <div class="sidebar-nav scrollspy-example" style="overflow: scroll; height: 80%;">
        <ul id="sidebarnav">
          <li v-if="!isSelectComplex" class="nav-small-cap">
            <iconify-icon icon="solar:menu-dots-linear" class="nav-small-cap-icon fs-4"></iconify-icon>
            <span class="hide-menu">Interest</span>
          </li>
          <span v-if="isSelectComplex"> </span>
          <span v-else-if="activeSale"><apt-sale v-for="info in aptInterestList" :key="info.id" :info="info" />
          </span>
          <span v-else>
            <apt-complex v-for="info in complexInterestList" @dealInfo="(info)=>(dealInfo=info)"  @response="(info) => (currInfo = info)" :key="info.aptName"
              :info="info" />
          </span>
          <li v-if="!isSelectComplex">
            <span class="sidebar-divider lg"></span>
          </li>
          <li class="nav-small-cap">
            <iconify-icon icon="solar:menu-dots-linear" class="nav-small-cap-icon fs-4"></iconify-icon>
            <span class="hide-menu">LIST</span>
          </li>
          <span v-if="isSelectComplex">
            <apt-sale v-for="info in selectedAptList" :key="info.id" :info="info" />
          </span>
          <span v-else-if="activeSale"><apt-sale v-for="info in saleList" :key="info.id" :info="info" /></span>
          <span v-else>
            <apt-complex v-for="info in complexList" @dealInfo="(info)=>(dealInfo=info)" @response="(info) => (currInfo = info)" :key="info.aptName"
              :info="info" />
          </span>
        </ul>
      </div>

      <!-- <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav> -->
    </div>
  </div>
</template>

<style scoped></style>
