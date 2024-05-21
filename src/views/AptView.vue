<script setup>
import AptMap from "@/components/apt-info/AptMap.vue";
import LeftSideVue from "@/components/apt-info/LeftSide.vue";
import Modal from '@/components/apt-info/Modal.vue';

import { ref, defineProps, watch, provide } from 'vue';

const saleList = ref([]);
const complexList = ref([])

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
