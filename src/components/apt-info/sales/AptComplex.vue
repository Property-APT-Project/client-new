<script setup>
const props = defineProps({
  info: Object,
});

const emit = defineEmits(["response"]);
function clickComplexButton(info) {
  emit("response", info);
}
</script>

<template>
  <li class="sidebar-item mb-3">
    <a class="" href="#" @click="clickComplexButton(info)">
      <div class="row bg-gray p-3" style="background-color: white">
        <div class="col-5 d-flex">
          <div class="col-5 d-flex w-100" style="object-fit: cover;">
            <img v-if="info.thumbImg != '@/assets/images/no-image.jpeg'" class="rounded w-100 align-middle"
              :src="info.thumbImg" alt="prd1" />
            <img v-else class="rounded w-100 align-middle" src="@/assets/images/no-image.jpeg" alt="prd1" />
          </div>
        </div>
        <div class="col-7 m-0">
          <h5 class="omyu_pretty">{{ info.aptName }}</h5>

          <h6>{{ info.address }}</h6>
        </div>
      </div>
    </a>
  </li>
</template>

<style scoped></style>
