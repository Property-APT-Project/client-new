<script setup>
import SearchBar from "@/components/common/SearchBar.vue";
import NewsList from "@/components/main/NewsList.vue";
import RankList from "@/components/main/RankList.vue";
</script>

<template>
  <div class="body-wrapper-inner">
    <div class="container-fluid">
      <SearchBar />
      <RankList />
      <NewsList />
    </div>
  </div>
</template>

<style scoped></style>
