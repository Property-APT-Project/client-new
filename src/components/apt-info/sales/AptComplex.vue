<script setup>
import { useRoute, useRouter } from 'vue-router';
import Cookies from "js-cookie";
import axios from "axios";
import { ref, watch } from 'vue';


const props = defineProps({
  info: Object,
});

const emit = defineEmits(["response", "dealInfo"]);
function clickComplexButton(info) {
  emit("response", info);
}

import { inject } from 'vue';

const toggleModal = inject('toggleModal');

const openModal = () => {
  toggleModal();
  emit("dealInfo", props.info);
  console.log(props.info)
};


const isSelectInterest = ref(props.info.interest);


async function registInterest() {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);

  console.log("post!!!!!!", "http://localhost:8080/where-is-my-home/interest/post");
  console.log('props.info:', props.info); // props.info의 내용을 확인
  console.log('props.info.id:', props.info.id); // props.info.id 값을 확인

  const requestBody = {
    id: 0,
    userId: 0,
    category: 2, // 예제에서 category가 2이라고 설정
    interestId: props.info.aptName,
    lng: props.info.lng,
    lat: props.info.lat
  };

  console.log('Request Body:', requestBody);

  await axios.post(
    "http://localhost:8080/where-is-my-home/interest/post",
    requestBody,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + token.accessToken
      }
    }
  )
    .then((response) => {
      console.log("post 성공", response);
    })
    .catch((error) => {
      console.error("post 실패", error);
      isSelectInterest.value = !isSelectInterest.value;
    });

}

async function deleteInterest() {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);

  console.log("delete!!!!!!", `http://localhost:8080/where-is-my-home/interest/delete/${props.info.aptName}`);
  console.log('props.info.id:', props.info.aptName); // props.info.id 값을 확인


  await axios.delete(
    `http://localhost:8080/where-is-my-home/interest/delete/${props.info.id}`,
    {
      headers: {
        Authorization: "Bearer " + token.accessToken
      }
    }
  )
    .then((response) => {
      console.log("delete 성공", response);
    })
    .catch((error) => {
      console.error("delete 실패", error);
      isSelectInterest.value = !isSelectInterest.value;
    });

}

function changeState() {
  isSelectInterest.value = !isSelectInterest.value;

  if (isSelectInterest.value)
    registInterest();
  else
    deleteInterest();

}



</script>

<template>
  <li class="sidebar-item mb-3 me-3 pe-3">

    <div class="row bg-gray p-3" style="background-color: white">

      <div class="col-5 d-flex">
        <div class="col-5 d-flex w-100" style="object-fit: cover;">
          <a class="" href="#" @click="clickComplexButton(info)">
            <img v-if="info.thumbImg != '@/assets/images/no-image.jpeg'" class="rounded w-100 align-middle"
              :src="info.thumbImg" alt="prd1" />
            <img v-else class="rounded w-100 align-middle"
              src="https://d1774jszgerdmk.cloudfront.net/512/default_img_horizon.png" alt="prd1" />
          </a>
        </div>
      </div>
      <div class="col-7 m-0">
        <div class="row">
          <div class="col-9">
            <h5 class="omyu_pretty">{{ info.aptName }}</h5>
            
          </div>
          <div class="col-3 p-0">
            
            <a @click="changeState" class="p-0" style="height: 50%; width: 50%; cursor: pointer;">
              <img class="m-0" src="@/assets/icons/icon-heart.png" style="width: 50%;" />
            </a>
          </div>

          

        </div>

        <div class="col-3 p-0 m-0 align-items-center w-100">
          <h6 class="mt-2">{{ info.address }}</h6>
            <button class="p-1 w-100 rounded-pill bg-light text-gray align-self-center" type="submit"
              style="font-size: 12px; border: none" @click="openModal">
              실거래가 조회
            </button>
          </div>

      </div>
    </div>
  </li>
</template>

<style scoped></style>
