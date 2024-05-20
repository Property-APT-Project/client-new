<script setup>
const props = defineProps({
    sale: Object,
    complex: Object
});
</script>

<template>
  <div class="card w-100">
    <div class="card-body p-4">
      <h5 class="card-title fw-semibold mb-4">매물 정보</h5>
      <div class="table-responsive" data-simplebar>
        <table class="table text-nowrap align-middle table-custom mb-0">
          <tbody>
            <tr>
              <td class="ps-0">
                <div class="d-flex align-items-center gap-6">
                  <h6 class="mb-0">매물특징</h6>
                </div>
              </td>
              <td>
                <span>{{ sale[0].description }}</span>
              </td>
            </tr>

            <tr>
              <td class="ps-0">
                <div class="d-flex align-items-center gap-6">
                  <h6 class="mb-0">면적</h6>
                </div>
              </td>
              <td>
                <span>{{sale[0].size}}</span>
              </td>
            </tr>

            <tr>
              <td class="ps-0">
                <div class="d-flex align-items-center gap-6">
                  <h6 class="mb-0">층</h6>
                </div>
              </td>
              <td>
                <span>{{sale[0].floor}}</span>
              </td>
            </tr>

            <tr>
              <td class="ps-0">
                <div class="d-flex align-items-center gap-6">
                  <h6 class="mb-0">월관리비</h6>
                </div>
              </td>
              <td>
                <span v-if="sale[0].maintenance_cost != '없음'">{{sale[0].maintenance_cost}}원</span>
                <span v-else>없음</span>
              </td>
            </tr>



            <tr>
              <td class="ps-0">
                <div class="d-flex align-items-center gap-6">
                  <h6 class="mb-0">총주차대수</h6>
                </div>
              </td>
              <td>
                <span>{{complex.parkingPossibleCount }}대(세대당 {{complex.parkingCountByHousehold}}대)</span>
              </td>
            </tr>


          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
