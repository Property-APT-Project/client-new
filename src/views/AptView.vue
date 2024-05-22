<script setup>
import AptMap from "@/components/apt-info/AptMap.vue";
import LeftSideVue from "@/components/apt-info/LeftSide.vue";
import Modal from '@/components/apt-info/Modal.vue';

import { onBeforeMount, ref, watch, defineProps, provide} from "vue";
import { useTokenStore } from "@/stores/token";
import { useRouter } from "vue-router";
import axios from "axios";
import Cookies from "js-cookie";

onBeforeMount(() => {
  getInterestSale();
  getInterestComplex();
});

const saleList = ref([]);
const complexList = ref([])

const token = useTokenStore();

const interestSaleList = ref([])
const nonInterestSaleList = ref([])
const interestSaleNameList = ref([])
const interestComplexList = ref([])
const nonInterestComplexList = ref([])
const interestComplexNameList = ref([])

async function getInterestSale() {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);

  const complexPath = "http://localhost:8080/where-is-my-home/interest/list/sale";

  await axios.get(complexPath, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      console.log("SUCCESS");

      interestSaleNameList.value = response.data.map(sale => sale.interestId);
      console.log(interestSaleNameList.value);
      // TODO
      // router.replace({ name: "community" });
    })
    .catch((error) => {
      console.error("Error:");
      // router.replace({ name: "community" });
    });
}


async function getInterestComplex() {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);

  const complexPath = "http://localhost:8080/where-is-my-home/interest/list/complex";

  await axios.get(complexPath, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      console.log("SUCCESS");

      interestComplexNameList.value = response.data.map(complex => complex.interestId);
      console.log(interestComplexNameList.value);
    })
    .catch((error) => {
      console.error("Error:");
    });
}


watch(saleList, (newValue, oldValue) => {
  getInterestSale();

  console.log("add flag");
  console.log(saleList.value);
  console.log(interestSaleNameList.value);
  
  interestSaleList.value = [];
  nonInterestSaleList.value = [];

  saleList.value.forEach(addFlagInterestSale);

  console.log("add flag");
  console.log(saleList.value);
})

watch(complexList, (newValue, oldValue) => {
  getInterestComplex();
  
  console.log("add comp flag-before");
  console.log(complexList.value);
  console.log(interestComplexNameList.value);

  interestComplexList.value = [];
  nonInterestComplexList.value = [];
  
  complexList.value.forEach(addFlagInterestComplex);

  console.log("add comp flag-after");
  console.log(complexList.value);
})


function addFlagInterestSale(sale) {
  if (interestSaleNameList.value.includes(sale.id)) {
    sale.interest = true;
    interestSaleList.value.push(sale);
    
  }
  else{
    sale.interest = false;
    nonInterestSaleList.value.push(sale);
  }
}

function addFlagInterestComplex(complex) {
  if (interestComplexNameList.value.includes(complex.aptName)) {
    complex.interest = true;
    interestComplexList.value.push(complex);
    
  }
  else{
    complex.interest = false;
    nonInterestComplexList.value.push(complex);
  }
}







const props = defineProps(['keyword']);
console.log("keyword", props.keyword);

const selectLat = ref();
const selectLng = ref();

watch(selectLat, (newValue, oldValue) => {
  console.log(selectLat.value, selectLng.value);
})

const showModal = ref(false);

provide('showModal', showModal);
provide('toggleModal', () => {
  showModal.value = !showModal.value;
});

const dealInfo = ref()

watch(dealInfo, (newValue, oldValue) =>{
  console.log(dealInfo);
})



</script>

<template>
  <div class="body-wrapper ms-0 me-0">
    <div class="row" style="height: 100vh">
      <LeftSideVue :saleList="saleList"
      :complexList="complexList"
      :non-interest-complex-list="nonInterestComplexList"
      :non-interest-sale-list="nonInterestSaleList"
      :interestComplexList="interestComplexList"
      :interestSaleList="interestSaleList"
      @selectLat="(lat) => selectLat = lat"
      @selectLng="(lng) => selectLng = lng"
      @dealInfo="(info) => dealInfo = info"
      />

      <AptMap 
      @saleList="(sales) => saleList = sales" 
      @complexList="(complexes) => complexList = complexes" 
      :keyword="keyword"
      :selectLat="selectLat"
      :selectLng="selectLng"/>
    </div>
  </div>

  <Modal v-if="showModal" @close="showModal = false" :dealInfo="dealInfo" />
</template>

<style></style>
