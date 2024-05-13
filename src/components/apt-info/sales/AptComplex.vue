<script setup>
const props = defineProps({
  info: Object,
});
</script>

<template>
  <li class="sidebar-item mb-3">
    <a class="" href="#">
      <div class="row bg-gray p-3" style="background-color: white">
        <div class="col-5">
          <img class="rounded w-100" src="@/assets/images/blog/blog-img1.jpg" alt="prd1" />
        </div>
        <div class="col-7">
          <h5 class="mb-1">{{ info.aptName }}</h5>

          <h6>{{ info.address }}</h6>
          <p class="mb-0">최근 실거래가: {{ info.price }} 만원</p>
        </div>
      </div>
    </a>
  </li>
</template>

<style scoped></style>
