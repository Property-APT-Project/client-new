<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const keyword = ref('');
  const router = useRouter();

  const navigateToAptMap = () => {
    router.push({ name: 'aptKeyword', params: { keyword: keyword.value } });
  };


</script>

<template>
  <div class="col-lg-12 justify-content-center row ps-3">
    <div class="card align-items-center justify-content-center rounded-pill col-12">
      <div class="p-1 card-body align-items-center justify-content-center w-100">
        <div class="d-flex align-items-center gap-6 w-100">
          <form class="w-100">
            <div class="row w-100 m-1">
              <div class="col-9 ps-0 me-0">
                <input
                  class="w-100 input-lg p-1"
                  v-model="keyword"
                  style="font-size: 15px; border: none"
                  placeholder="검색어를 입력하세요."
                  type="text"
                />
              </div>
              <div class="col-3 p-0 m-0 align-items-center">
                <button
                  class="p-1 w-100 rounded-pill bg-light text-gray align-self-center h-100"
                  type="submit"
                  style="font-size: 12px; border: none"
                  @click="navigateToAptMap"
                >
                  검색
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
