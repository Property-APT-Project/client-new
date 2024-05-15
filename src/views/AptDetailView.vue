<script setup>
components: {
  GraphVue;
}
import PhotoGroupVue from "@/components/apt-detail/apt-photo/PhotoGroup.vue";
import DetailVue from "@/components/apt-detail/Detail.vue";
import GraphVue from "@/components/apt-detail/GraphVue.vue";
import RankList from "@/components/main/RankList.vue";
import PriceVue from "@/components/apt-detail/Price.vue";
import SaleDetailVue from "@/components/apt-detail/SaleDetail.vue";
import FocusedMap from "@/components/common/FocusedMap.vue";
</script>

<template>
  <div class="body-wrapper ms-0 me-0">
    <div class="body-wrapper-inner mb-6 container-fluid w-100">
      <PhotoGroupVue />

      <div class="row">
        <div class="row col-lg-8 d-flex align-items-stretch">
          <div class="col-12"><FocusedMap /></div>
          <div class="col-12"><DetailVue /></div>
          <div class="col-12"><SaleDetailVue /></div>
          <div class="col-12"><graph-vue /></div>

          <div class="col-12"><PriceVue /></div>
        </div>
        <div class="col-lg-4 d-flex" style="height: 100%">
          <div class="card w-100">
            <div class="card-body p-4">
              <div class="mb-4">
                <h5 class="card-title fw-semibold">Daily activities</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
