<script setup>
const props = defineProps({
  aptInfo: Object,
});

import { ref } from 'vue';
import { useRouter } from 'vue-router';

  const router = useRouter();

  const navigateToAptMap = () => {
    router.push({ name: 'aptKeyword', params: { keyword: props.aptInfo.keyword } });
  };
</script>



<template>
  <div class="col-lg-4" style="cursor: pointer;" @click="navigateToAptMap">
    <div class="card align-items-center justify-content-center">
      <div class="card-body align-items-center justify-content-center">
        <div class="d-flex align-items-center gap-6">
          <span class="round-48 d-flex align-items-center justify-content-center rounded">
            <img src="@/assets/icons/icon-rank1.png" width="100%" />
          </span>
          <h3 class="mb-0 p-0" style="font-family: 'WavvePADO-Regular';">{{ aptInfo.keyword }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
    font-family: 'WavvePADO-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2404@1.0/WavvePADO-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
</style>
