<script setup>
import "@/assets/libs/jquery/dist/jquery.min.js";
import "@/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js";
import "@/assets/js/sidebarmenu.js";
import "@/assets/js/app.min.js";
import "@/assets/libs/apexcharts/dist/apexcharts.min.js";
import "@/assets/libs/simplebar/dist/simplebar.js";

import { Icon } from "@iconify/vue";
import Header from "@/layout/Header.vue";
import MainView from "@/views/MainView.vue";
import AptView from "@/views/AptView.vue";
import AptDetailView from "./views/AptDetailView.vue";
</script>

<template>
  <!--  Body Wrapper -->
  <body
    class="page-wrapper w-100 h-100"
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    data-sidebartype="full"
    data-sidebar-position="fixed"
    data-header-position="fixed"
    style="background-color: #f4f7fb"
  >
    <Header></Header>
    <!-- <MainView /> -->
    <!-- <AptView /> -->
    <AptDetailView/>
  </body>
</template>

<style>
@import url("@/assets/css/styles.min.css");
</style>
