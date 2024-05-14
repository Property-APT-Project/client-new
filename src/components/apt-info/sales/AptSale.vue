<script setup>
const props = defineProps({
  info: Object,
});
</script>

<template>
  <li class="sidebar-item mb-3">
    <a class="" href="#">
      <div class="row bg-gray p-3" style="background-color: white">
        <div class="col-5 d-flex">
          <img
            class="rounded w-100 align-middle"
            src="@/assets/images/blog/blog-img1.jpg"
            alt="prd1"
          />
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
          <p class="mb-0">{{ info.floor }} 층 / {{ info.direction }}</p>
        </div>
      </div>
    </a>
  </li>
</template>

<style scoped></style>
