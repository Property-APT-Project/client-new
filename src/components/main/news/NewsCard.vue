<script setup>
const props = defineProps({
  newsInfo: Object,
});
</script>

<template>
  <div class="col-lg-4">
    <div class="card overflow-hidden hover-img">
      <div class="position-relative">
        <a href="javascript:void(0)">
          <img src="@/assets/images/blog/blog-img1.jpg" class="card-img-top" alt="matdash-img" />
        </a>
      </div>
      <div class="card-body p-4">
        <a class="d-block my-4 fs-5 text-dark fw-semibold link-primary mt-0" href="">{{
          newsInfo.title
        }}</a>
        <p class="d-block my-4 fs-5 text-dark">{{ newsInfo.subTitle }}</p>
        <div class="d-flex align-items-center gap-4">
          <div class="d-flex align-items-center gap-2">
            <i class="ti ti-eye text-dark fs-5"></i>{{ newsInfo.viewCount }}
          </div>
          <div class="d-flex align-items-center fs-2 ms-auto">
            <i class="ti ti-point text-dark"></i> {{ newsInfo.writeTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
