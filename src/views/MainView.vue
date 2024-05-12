<script setup>
import SearchBar from "@/components/common/SearchBar.vue";
import NewsList from "@/components/main/NewsList.vue";
import RankList from "@/components/main/RankList.vue";
</script>

<template>
  <div class="body-wrapper-inner mb-6 container-fluid w-100">
    <SearchBar />
      <RankList />
      <NewsList />

  </div>
</template>

<style scoped></style>
