<script setup>
import Photo from "@/components/apt-detail/apt-photo/Photo.vue";
import { onMounted, ref} from "vue";

const props = defineProps({
  complex: Object,
  saleInfo: Object
});

onMounted(() => {
  console.log("Component mounted");
  console.log(props.saleInfo[0].aptName);
});
</script>

<template>
  <div class="card w-100">
    <div class="card-body p-4">
      <div class="row">
        <div class="col-6 p-3">
          <Photo :photoSrc="saleInfo[0].img1" />
        </div>
        <div class="col-6">
          <div class="row p-3">
            <div class="col-6">
              <Photo :photoSrc="complex.images2" />
            </div>
            <div class="col-6">
              <Photo :photoSrc="complex.images3" />
            </div>
          </div>
          <div class="row p-3">
            <div class="col-6">
              <Photo :photoSrc="complex.images4" />
            </div>
            <div class="col-6">
              <Photo :photoSrc="complex.images5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
