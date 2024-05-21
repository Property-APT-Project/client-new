<script setup>
import AptMap from "@/components/apt-info/AptMap.vue";
import LeftSideVue from "@/components/apt-info/LeftSide.vue";
import Modal from '@/components/apt-info/Modal.vue';

import { onBeforeMount, ref, watch, defineProps, provide} from "vue";
import { useTokenStore } from "@/stores/token";
import { useRouter } from "vue-router";
import axios from "axios";
import Cookies from "js-cookie";

const router = useRouter();
onBeforeMount(() => {
  getData();
  // presentData.value = formData.value
});

const {
  VITE_APP_API_URL,
  VITE_APP_LOGIN,
  VITE_APP_PROFILE,
  VITE_APP_API_MEMBER_UPLOAD,
  VITE_APP_MEMBER_DELETE,
  VITE_APP_LOGOUT,
} = import.meta.env;
// const router = useRouter();
const formData = ref({
  email: "",
  name: "",
  address: "",
  phoneNumber: "",
  imgURL: "",
});

const presentData = ref({
  email: "",
  name: "",
  address: "",
  phoneNumber: "",
  imgURL: "",
});

const isModify = ref(false);

const token = useTokenStore();

console.log(token.accessToken);
console.log(token.refreshToken);

async function getData() {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);

  const complexPath = "http://localhost:8080/where-is-my-home/interest/list/complex";

  axios.get(complexPath, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      console.log("SUCCESS");
      console.log(response.data);
      presentData.value = response.data;
      // TODO
      // router.replace({ name: "community" });
    })
    .catch((error) => {
      console.error("Error:");
      // router.replace({ name: "community" });
    });
}







const saleList = ref([]);
const complexList = ref([])

const props = defineProps(['keyword']);
console.log("keyword", props.keyword);

const selectLat = ref();
const selectLng = ref();

watch(selectLat, (newValue, oldValue) => {
  console.log(selectLat.value, selectLng.value);
})

const showModal = ref(false);

provide('showModal', showModal);
provide('toggleModal', () => {
  showModal.value = !showModal.value;
});

const dealInfo = ref()

watch(dealInfo, (newValue, oldValue) =>{
  console.log(dealInfo);
})



</script>

<template>
  <div class="body-wrapper ms-0 me-0">
    <div class="row" style="height: 100vh">
      <LeftSideVue :saleList="saleList"
      :complexList="complexList"
      @selectLat="(lat) => selectLat = lat"
      @selectLng="(lng) => selectLng = lng"
      @dealInfo="(info) => dealInfo = info"
      />

      <AptMap 
      @saleList="(sales) => saleList = sales" 
      @complexList="(complexes) => complexList = complexes" 
      :keyword="keyword"
      :selectLat="selectLat"
      :selectLng="selectLng"/>
    </div>
  </div>

  <Modal v-if="showModal" @close="showModal = false" :dealInfo="dealInfo" />
</template>

<style></style>
