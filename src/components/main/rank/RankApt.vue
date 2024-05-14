<script setup>
const props = defineProps({
  aptInfo: Object,
});
</script>

<template>
  <div class="col-lg-4">
    <div class="card align-items-center justify-content-center">
      <div class="card-body align-items-center justify-content-center">
        <div class="d-flex align-items-center gap-6">
          <span class="round-48 d-flex align-items-center justify-content-center rounded">
            <img src="@/assets/icons/icon-rank1.png" width="100%" />
          </span>
          <h2 class="mb-0 p-0">{{ aptInfo.aptName }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
