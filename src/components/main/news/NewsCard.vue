<script setup>
const props = defineProps({
  newsInfo: Object,
});
</script>

<template>
  <div class="col-lg-4 h-100">
    <div class="card overflow-hidden hover-img">
      <div class="position-relative">
        <a :href="newsInfo.linkUrl">
          <img :src="newsInfo.thumbnail" class="card-img-top" alt="matdash-img" />
        </a>
      </div>
      <div class="card-body p-4">
        <a class="d-block my-4 fs-5 text-dark fw-semibold link-primary mt-0" href="">{{
          newsInfo.title
        }}</a>
        <p class="d-block my-4 fs-5 text-dark">{{ newsInfo.summaryContent }}</p>
        <div class="d-flex align-items-center gap-4">
          <div class="d-flex align-items-center fs-2 ms-auto">
            <i class="ti ti-point text-dark"></i> {{ newsInfo.publishDateTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
