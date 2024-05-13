<script setup>
import { ref } from "vue";

import AptSale from "@/components/apt-info/sales/AptSale.vue";
import AptComplex from "@/components/apt-info/sales/AptComplex.vue";
import SearchBar from "../common/SearchBar.vue";

const id = ref(0);
const activeSale = ref(true);
const activeComplex = ref(false);

const aptInterestList = ref([
  { aptName: "APT NAME1", price: 2000, floor: 3, direction: "남향" },
  { aptName: "APT NAME2", price: 2000, floor: 3, direction: "남향" },
  { aptName: "APT NAME3", price: 2000, floor: 3, direction: "남향" },
  { aptName: "APT NAME4", price: 2000, floor: 3, direction: "남향" },
]);

const complexInterestList = ref([
  { aptName: "APT NAME1", price: 2000, address: "강남구 역삼동" },
  { aptName: "APT NAME2", price: 2000, address: "강남구 역삼동" },
  { aptName: "APT NAME3", price: 2000, address: "강남구 역삼동" },
  { aptName: "APT NAME4", price: 2000, address: "강남구 역삼동" },
]);

const aptList = ref([
  { aptName: "APT NAMEA", price: 2000, floor: 3, direction: "남향" },
  { aptName: "APT NAMEB", price: 2000, floor: 3, direction: "남향" },
  { aptName: "APT NAMEC", price: 2000, floor: 3, direction: "남향" },
  { aptName: "APT NAMED", price: 2000, floor: 3, direction: "남향" },
]);

const complexList = ref([
  { aptName: "APT NAMEA", price: 2000, address: "강남구 역삼동" },
  { aptName: "APT NAMEB", price: 2000, address: "강남구 역삼동" },
  { aptName: "APT NAMEC", price: 2000, address: "강남구 역삼동" },
  { aptName: "APT NAMED", price: 2000, address: "강남구 역삼동" },
]);

const activateSale = () => {
  activeSale.value = true;
  activeComplex.value = false;
};

const activateComplex = () => {
  activeSale.value = false;
  activeComplex.value = true;
};
</script>

<template>
  <div class="body-wrapper col-2 m-0 pe-0 bg-light">
    <div class="container-fluid h-100">
      <div class="sidebar-nav scrollspy-example" data-simplebar="" data-spy="scroll">
        <ul id="sidebarnav">
          <li class="nav-small-cap">
            <iconify-icon
              icon="solar:menu-dots-linear"
              class="nav-small-cap-icon fs-4"
            ></iconify-icon>
            <span class="hide-menu">Interest</span>
          </li>
          <span v-if="activeSale"
            ><AptSale v-for="info in aptInterestList" :key="info.aptName" :info="info" />
          </span>
          <span v-else>
            <AptComplex v-for="info in complexInterestList" :key="info.aptName" :info="info" />
          </span>

          <li>
            <span class="sidebar-divider lg"></span>
          </li>
          <li class="nav-small-cap">
            <iconify-icon
              icon="solar:menu-dots-linear"
              class="nav-small-cap-icon fs-4"
            ></iconify-icon>
            <span class="hide-menu">LIST</span>
          </li>
          <span v-if="activeSale"
            ><AptSale v-for="info in aptList" :key="info.aptName" :info="info"
          /></span>
          <span v-else>
            <AptComplex v-for="info in complexList" :key="info.aptName" :info="info" />
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
