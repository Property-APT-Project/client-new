<script setup>
import "@/assets/libs/jquery/dist/jquery.min.js";
import "@/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js";
import "@/assets/js/sidebarmenu.js";
import "@/assets/js/app.min.js";
import "@/assets/libs/apexcharts/dist/apexcharts.min.js";
import "@/assets/libs/simplebar/dist/simplebar.js";
import "@/assets/js/dashboard.js";
</script>

<template>
  <div class="card w-100">
    <div class="card-body p-4">
      <div class="d-sm-flex d-block align-items-center justify-content-between mb-9">
        <div class="mb-3 mb-sm-0">
          <h5 class="card-title fw-semibold">가격 변동</h5>
        </div>
        <div>
          <select class="form-select">
            <option value="1">최근 3년</option>
            <option value="2">최근 1년</option>
            <option value="3">향후 1년 (예측)</option>
            <option value="4">향후 3년 (예측)</option>
          </select>
        </div>
      </div>
      <div id="revenue-forecast"></div>
    </div>
  </div>
</template>

<style scoped></style>
