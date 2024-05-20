<script setup>
const props = defineProps({
    complex: Object
});

console.log("Detail")
console.log(props.complex)

</script>

<template>
  <span v-if="complex != null">
  <div class="card w-100">
    <div class="card-body p-4">
      <h5 class="card-title fw-semibold mb-4">단지 정보</h5>
      <div class="table-responsive" data-simplebar>
        <table class="table text-nowrap align-middle table-custom mb-0">
          <tbody>
            <tr>
              <td class="ps-0">
                <div class="d-flex align-items-center gap-6">
                  <h6 class="mb-0">세대수</h6>
                </div>
              </td>
              <td>
                <span>{{complex.houseHoldCount}}세대(총{{complex.totalDongCount}}개동)</span>
              </td>
            </tr>

            <tr>
              <td class="ps-0">
                <div class="d-flex align-items-center gap-6">
                  <h6 class="mb-0">저/최고층</h6>
                </div>
              </td>
              <td>
                <span>{{complex.lowFloor}}층/{{complex.highFloor}}층</span>
              </td>
            </tr>

            <tr>
              <td class="ps-0">
                <div class="d-flex align-items-center gap-6">
                  <h6 class="mb-0">사용승인일</h6>
                </div>
              </td>
              <td>
                <span>{{ complex.useApproveYmd.substr(0,4) }}년 {{ complex.useApproveYmd.substr(4,2) }}월</span>
              </td>
            </tr>

            <tr>
              <td class="ps-0" rowspan="2">
                <div class="d-flex align-items-center gap-6">
                  <h6 class="mb-0">주소</h6>
                </div>
              </td>
              <td>
                <span>{{ complex.address }} {{ complex.dongAddress }}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>{{ complex.roadAddress }}</span>
              </td>
            </tr>

            <tr>
              <td class="ps-0">
                <div class="d-flex align-items-center gap-6">
                  <h6 class="mb-0">면적</h6>
                </div>
              </td>
              <td>
                <span>{{ complex.pyoengNames }}㎡</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</span>
</template>

<style scoped></style>
