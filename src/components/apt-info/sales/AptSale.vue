<script setup>
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  info: Object,
});

const router = useRouter();

console.log(props.info);
const goToDetail = () => {
  router.push({ name: 'apt-detail-id', params: { id: props.info.id } });

};

</script>

<template>
  <li class="sidebar-item mb-3 me-3 pe-3" @click="goToDetail">
    <a class="" href="#">
      <div class="row bg-gray p-3" style="background-color: white">
        <div class="col-5 d-flex">
          <img v-if="info.img1 != '@/assets/images/no-image.jpeg'" class="rounded w-100 align-middle"
              :src="info.img1" alt="prd1" />
            <img v-else class="rounded w-100 align-middle" src="@/assets/images/no-image.jpeg" alt="prd1" />
        </div>
        <div class="col-7">
          <div class="row">
            <div class="col-9">
              <h5 class="omyu_pretty">{{ info.aptName }}</h5>
            </div>
            <div class="col-3">
              <input type="checkbox" id="heart" />
            </div>
          </div>

          <h6 class="">{{ info.price }} 만원</h6>
          <p class="mb-0">{{ info.floor }} / {{ info.size }}</p>
        </div>
      </div>
    </a>
  </li>
</template>

<style scoped></style>
