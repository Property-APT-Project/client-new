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
import DealSideBar from "@/components/apt-detail/DealSideBar.vue";
</script>

<template>
  <div class="body-wrapper ms-0 me-0">
    <div class="body-wrapper-inner mb-6 container-fluid w-100">
      <div class="row">
        <div class="col-12">
          <PhotoGroupVue />
        </div>
        
      </div>
      

      <div class="row" style="margin-right: 0; padding-right: 0; padding-left: 0;">
        <div class="row col-lg-8 d-flex align-items-stretch" style="margin-right: 0; margin-left: 0; padding-left: 0; padding-right: 0;">
          <div class="col-12">
            <FocusedMap />
          </div>
          <div class="col-12" style="padding-right: 0;">
            <DetailVue />
          </div>
          <div class="col-12"  style="padding-right: 0;">
            <SaleDetailVue />
          </div>
          <div class="col-12"  style="padding-right: 0;"><graph-vue /></div>

          <div class="col-12"  style="padding-right: 0;">
            <PriceVue />
          </div>
        </div>
        <div class="row col-lg-4 d-flex align-items-stretch" style="height: 100%; margin: 0; padding-right: 0;">
          <DealSideBar/>


        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
