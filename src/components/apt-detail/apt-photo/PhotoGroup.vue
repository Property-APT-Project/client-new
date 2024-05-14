<script setup>
  import Photo from "@/components/apt-detail/apt-photo/Photo.vue";
</script>

<template>
  <div class="card w-100">
    <div class="card-body p-4">
      <div class="row">
        <div class="col-6 p-3">
          <Photo/>
        </div>
        <div class="col-6">
          <div class="row p-3">
            <div class="col-6">
              <Photo/>
            </div>
            <div class="col-6">
              <Photo/>
            </div>
          </div>
          <div class="row p-3">
            <div class="col-6">
              <Photo/>
            </div>
            <div class="col-6">
              <Photo/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
