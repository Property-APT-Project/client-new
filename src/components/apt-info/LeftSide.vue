<script setup>
import { ref, watch } from "vue";

import AptSale from "@/components/apt-info/sales/AptSale.vue";
import AptComplex from "@/components/apt-info/sales/AptComplex.vue";
import MiniSearchBar from "../common/MiniSearchBar.vue";

let id = ref(0);
const activeSale = ref(true);
const activeComplex = ref(false);

const currInfo = ref(null);

const complexInterestList = ref([
  { id: id++, aptName: "APT NAME1", price: 2000, address: "강남구 역삼동" },
  { id: id++, aptName: "APT NAME2", price: 2000, address: "강남구 역삼동" },
  { id: id++, aptName: "APT NAME3", price: 2000, address: "강남구 역삼동" },
  { id: id++, aptName: "APT NAME4", price: 2000, address: "강남구 역삼동" },
]);

const complexList = ref([
  { id: id++, aptName: "APT NAMEA", price: 2000, address: "강남구 역삼동" },
  { id: id++, aptName: "APT NAMEB", price: 2000, address: "강남구 역삼동" },
  { id: id++, aptName: "APT NAMEC", price: 2000, address: "강남구 역삼동" },
  { id: id++, aptName: "APT NAMED", price: 2000, address: "강남구 역삼동" },
]);

const allAptList = ref([
  { id: id++, aptName: "APT NAME1", price: 2000, floor: 3, direction: "남향", interest: true },
  { id: id++, aptName: "APT NAME2", price: 2000, floor: 3, direction: "남향", interest: true },
  { id: id++, aptName: "APT NAME3", price: 2000, floor: 3, direction: "남향", interest: true },
  { id: id++, aptName: "APT NAME4", price: 2000, floor: 3, direction: "남향", interest: true },
  { id: id++, aptName: "APT NAMEA", price: 2000, address: "강남구 역삼동", interest: false },
  { id: id++, aptName: "APT NAMEB", price: 2000, address: "강남구 역삼동", interest: false },
  { id: id++, aptName: "APT NAMEC", price: 2000, address: "강남구 역삼동", interest: false },
  { id: id++, aptName: "APT NAMED", price: 2000, address: "강남구 역삼동", interest: false },
]);

const aptInterestList = allAptList.value.filter((apt) => apt.interest);

const aptNonInterestList = allAptList.value.filter((apt) => !apt.interest);

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

const aptName = ref("APT NAME1");
let selectedAptList = allAptList.value.filter((apt) => apt.aptName == aptName.value);

watch(currInfo, (newInfo, prevInfo) => {
  console.log(newInfo);
  isSelectComplex.value = true;
  activeSale.value = true;
  activeComplex.value = false;
  aptName.value = newInfo.aptName;
  console.log(aptName.value);
  selectedAptList = allAptList.value.filter((apt) => apt.aptName == aptName.value);
});
</script>

<template>
  <div class="body-wrapper col-lg-3 col-md-4 col-sm-12 m-0 pe-3 bg-light">
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
      <div class="sidebar-nav scrollspy-example" style="overflow: scroll">
        <ul id="sidebarnav" style="height: 600px">
          <li v-if="!isSelectComplex" class="nav-small-cap">
            <iconify-icon
              icon="solar:menu-dots-linear"
              class="nav-small-cap-icon fs-4"
            ></iconify-icon>
            <span class="hide-menu">Interest</span>
          </li>
          <span v-if="isSelectComplex"> </span>
          <span v-else-if="activeSale"
            ><AptSale v-for="info in aptInterestList" :key="info.id" :info="info" />
          </span>
          <span v-else>
            <AptComplex
              v-for="info in complexInterestList"
              @response="(info) => (currInfo = info)"
              :key="info.id"
              :info="info"
            />
          </span>
          <li v-if="!isSelectComplex">
            <span class="sidebar-divider lg"></span>
          </li>
          <li class="nav-small-cap">
            <iconify-icon
              icon="solar:menu-dots-linear"
              class="nav-small-cap-icon fs-4"
            ></iconify-icon>
            <span class="hide-menu">LIST</span>
          </li>
          <span v-if="isSelectComplex">
            <AptSale v-for="info in selectedAptList" :key="info.id" :info="info" />
          </span>
          <span v-else-if="activeSale"
            ><AptSale v-for="info in aptNonInterestList" :key="info.id" :info="info"
          /></span>
          <span v-else>
            <AptComplex v-for="info in complexList" :key="info.id" :info="info" />
          </span>
        </ul>
      </div>

      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped></style>
