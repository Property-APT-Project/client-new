<script setup>
import RankList from "@/components/main/RankList.vue";
import FocusedMap from "@/components/common/FocusedMap.vue";
import AptMap from "@/components/apt-info/AptMap.vue";
import LeftSideVue from "@/components/apt-info/LeftSide.vue";
import RightSideVue from "@/components/apt-info/RightSide.vue";
</script>

<template>
  <div class="body-wrapper ms-0 me-0">
    <div class="row" style="height: 100vh">
      <LeftSideVue />

      <AptMap />
    </div>
  </div>
</template>

<style></style>
