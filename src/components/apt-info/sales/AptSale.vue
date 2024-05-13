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

          <h6>{{ info.price }}</h6>
          <p class="mb-0">{{ info.floor }} 층 / {{ info.direction }}</p>
        </div>
      </div>
    </a>
  </li>
</template>

<style scoped></style>
