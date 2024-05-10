<script setup>
import '@/assets/libs/jquery/dist/jquery.min.js';
import '@/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js';
import '@/assets/js/sidebarmenu.js';
import '@/assets/js/app.min.js';
import '@/assets/libs/apexcharts/dist/apexcharts.min.js';
import '@/assets/libs/simplebar/dist/simplebar.js';
import Header from "@/layout/Header.vue";

</script>

<template>
  <Header />
  <router-view />
</template>

<style>
@import url('@/assets/css/styles.min.css');
</style>
