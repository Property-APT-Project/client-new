<script setup></script>

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
                  style="font-size: 15px; border: none"
                  placeholder="검색어를 입력하세요."
                  type="text"
                />
              </div>
              <div class="col-3 p-0 m-0 align-items-center">
                <button
                  class="p-1 w-100 rounded-pill bg-light text-gray align-self-center"
                  type="submit"
                  style="font-size: 12px; border: none"
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
