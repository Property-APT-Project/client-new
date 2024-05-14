<script setup>
import PostForm from "/src/components/community/PostForm.vue";
import PostCard from "/src/components/community/PostCard.vue";
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
      class="position-relative text-bg-light min-vh-100 align-items-center justify-content-center"
    >
      <div class="mb-3 d-flex justify-content-center sticky-top">
        <button
          class="mt-3 btn btn-primary col-3"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          글쓰기
        </button>
      </div>
      <PostForm />
      <div class="ms-2 me-2">
        <div class="row">
          <PostCard class="col-sm-4" />
          <PostCard class="col-sm-4" />
          <PostCard class="col-sm-4" />
        </div>
        <div class="row">
          <PostCard class="col-sm-4" />
          <PostCard class="col-sm-4" />
          <PostCard class="col-sm-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
