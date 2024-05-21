<script setup>
import AptMap from "@/components/apt-info/AptMap.vue";
import LeftSideVue from "@/components/apt-info/LeftSide.vue";

import { ref, defineProps, watch } from 'vue';

const saleList = ref([]);
const complexList = ref([])

const props = defineProps(['keyword']);
console.log("keyword", props.keyword);

const selectLat = ref();
const selectLng = ref();

watch(selectLat, (newValue, oldValue) => {
  console.log(selectLat.value, selectLng.value);
})




</script>

<template>
  <div class="body-wrapper ms-0 me-0">
    <div class="row" style="height: 100vh">
      <LeftSideVue :saleList="saleList"
      :complexList="complexList"
      @selectLat="(lat) => selectLat = lat"
      @selectLng="(lng) => selectLng = lng"
      />

      <AptMap 
      @saleList="(sales) => saleList = sales" 
      @complexList="(complexes) => complexList = complexes" 
      :keyword="keyword"
      :selectLat="selectLat"
      :selectLng="selectLng"/>
    </div>
  </div>
</template>

<style></style>
