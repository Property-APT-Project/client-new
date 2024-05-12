<script setup>
import PostDetail from "@/components/community/PostDetail.vue";
</script>

<template>
  <div
    class="page-wrapper"
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    data-sidebartype="full"
    data-sidebar-position="fixed"
    data-header-position="fixed"
  >
    <div
      class="position-relative p-3 text-bg-light min-vh-100 align-items-center justify-content-center"
    >
      <PostDetail />
    </div>
  </div>
</template>

<style scoped></style>
