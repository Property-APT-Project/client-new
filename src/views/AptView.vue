<script setup>
import AptMap from "@/components/apt-info/AptMap.vue";
import LeftSideVue from "@/components/apt-info/LeftSide.vue";

import {ref} from 'vue';
const saleList = ref([]);
const complexList = ref([])


</script>

<template>
  <div class="body-wrapper ms-0 me-0">
    <div class="row" style="height: 100vh">
      <LeftSideVue :saleList="saleList"
      :complexList="complexList"
      />

      <AptMap 
      @saleList="(sales) => saleList = sales" 
      @complexList="(complexes) => complexList = complexes" />
    </div>
  </div>
</template>

<style></style>
