<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top navbar-light bg-light p-3">
    <div class="container-fluid d-flex justify-content-between align-items-center">



      <div>
        <button class="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a href="./index.html" class="text-nowrap logo-img">
          <img src="../assets/images/logos/logo.svg" alt="" />
        </a>
      </div>

      <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link text-dark fs-6 me-2" href="#"> Main</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark fs-6 me-2" href="#"> APT</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark fs-6 me-2" href="#"> Community</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark fs-6 me-2" href="#"> My Feed</a>
          </li>
        </ul>
      </div>

      <div class="ms-3 d-flex justify-content-end">
        <a class="nav-link " href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="@/assets/images/profile/user-1.jpg" alt="" width="35" height="35" class="rounded-circle">
        </a>
      </div>
    </div>
  </nav>

</template>
<style scoped>

</style>
