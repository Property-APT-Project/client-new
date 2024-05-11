<script setup>
import "@/assets/libs/jquery/dist/jquery.min.js";
import "@/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js";
import "@/assets/js/sidebarmenu.js";
import "@/assets/js/app.min.js";
import "@/assets/libs/apexcharts/dist/apexcharts.min.js";
import "@/assets/libs/simplebar/dist/simplebar.js";
import { Icon } from "@iconify/vue";
import Header from "./layout/Header.vue";
import MainView from "./views/MainView.vue";
</script>

<template>
  
  <!--  Body Wrapper -->
  <div
    class="page-wrapper"
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    data-sidebartype="full"
    data-sidebar-position="fixed"
    data-header-position="fixed"
  >
    <!--  Main wrapper -->
    <div class="justify-content-center">
      <Header />
    </div>
    
    <div class="body-wrapper ms-0 me-0">
      
      <MainView />
    </div>
  </div>
</template>

<style>
@import url("@/assets/css/styles.min.css");
</style>
