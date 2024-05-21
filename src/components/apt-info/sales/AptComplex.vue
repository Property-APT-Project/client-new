<script setup>
const props = defineProps({
  info: Object,
});

const emit = defineEmits(["response", "dealInfo"]);
function clickComplexButton(info) {
  emit("response", info);
}

import { inject } from 'vue';

const toggleModal = inject('toggleModal');

const openModal = () => {
  toggleModal();
  emit("dealInfo", props.info);
  console.log(props.info)
};
</script>

<template>
  <li class="sidebar-item mb-3">
    
      <div class="row bg-gray p-3" style="background-color: white">
        
        <div class="col-5 d-flex">
          <div class="col-5 d-flex w-100" style="object-fit: cover;">
            <a class="" href="#" @click="clickComplexButton(info)">
            <img v-if="info.thumbImg != '@/assets/images/no-image.jpeg'" class="rounded w-100 align-middle"
              :src="info.thumbImg" alt="prd1" />
            <img v-else class="rounded w-100 align-middle" src="https://d1774jszgerdmk.cloudfront.net/512/default_img_horizon.png" alt="prd1" />
          </a>
        </div>
        </div>
        <div class="col-7 m-0">

          <h5 class="omyu_pretty">{{ info.aptName }}</h5>

          <h6>{{ info.address }}</h6>
          <div class="col-3 p-0 m-0 align-items-center w-100">
                <button
                  class="p-1 w-100 rounded-pill bg-light text-gray align-self-center"
                  type="submit"
                  style="font-size: 12px; border: none"
                  @click="openModal"
                >
                  실거래가 조회
                </button>
              </div>
        </div>
      </div>
  </li>
</template>

<style scoped></style>
