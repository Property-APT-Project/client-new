<script setup>
import Signup from "./Signup.vue";
import { onBeforeMount, ref } from "vue";
import { useTokenStore } from "@/stores/token";
import axios from "axios";
import Logo from "./Logo.vue";

onBeforeMount(() => {
  sendData();
  // presentData.value = formData.value
});

const { VITE_APP_API_URL, VITE_APP_LOGIN, VITE_APP_PROFILE } = import.meta.env;
// const router = useRouter();
const formData = ref({
  email: "",
  name: "",
  address: "",
  phoneNumber: "",
});

const presentData = ref({
  email: "q@q",
  name: "dsfdsf",
  address: "서울특별시 용산구",
  phoneNumber: "010-9999-1111",
})

const isModify = ref(false)

const token = useTokenStore();
console.log(token);
console.log(token.accessToken);
console.log(token.refreshToken);
async function sendData() {
  axios
    .get(VITE_APP_PROFILE, {
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
      console.error("Error:", error);
      // router.replace({ name: "community" });
    });
}

function resetData() {
  console.log("RESET DATA")
  Object.assign(formData.value, presentData.value)
  setFalse
  // formData.value = presentData.value
}

function changeState() {
  isModify.value = !isModify.value
}

const data = ref({
  zonecode: "",
  roadAddress: "",
  detailAddress: "",
})

function openPostcode() {
  new window.daum.Postcode({
    oncomplete: (d) => {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분
      data.value.zonecode = d.zonecode;
      data.value.roadAddress = d.roadAddress;
    },
  }).open();
}

const file = ref("")
async function uploadImage(event) {
  const files = event.target?.files
  file.value = files[0]
  await base64(file.value)
}

const isImageChanged = ref(false)
const setTrue = () => {
  isImageChanged.value = true
  console.log(isImageChanged.value)
}
const setModifyTrue = () => {
  isModify.value = true
}
const setFalse = () => {
  isImageChanged.value = false
  isModify.value = false
  console.log(isImageChanged.value)
}
function base64(file) {
  return new Promise(resolve => {
    let a = new FileReader()
    a.onload = e => {
      resolve(e.target.result)
      const previewImage = document.getElementById('profileImage')
      previewImage.src = e.target.result
    }

    a.readAsDataURL(file)
    setTrue()
  })
}
</script>

<template>
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <div
      class="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <!-- <div class="d-flex"> -->
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <h5 class="card-title fw-semibold mb-5">회원정보</h5>
              <!-- <div class="card"> -->
              <img src="@/assets/images/profile/user-1.jpg" id="profileImage" class="card-img" alt="..." />
              <div class="d-flex card-body justify-content-center">
                <label class="btn btn-light text-primary">
                  사진변경
                  <input hidden ref="image" id="profileImageInput" type="file" name="image" accept="image/*"
                    multiple="multiple" @change="uploadImage">
                </label>
                <!-- <button ref="image" id="input" type="file" name="image" accept="image/*" multiple="multiple"
                  class="btn btn-light" @change="uploadImage()"> hi </button>
                <button class="btn btn-light text-primary">
                  사진변경
                </button> -->
              </div>
              <!-- <div class="card-body"> -->
              <!-- <h5 class="card-title">이름</h5> -->
              <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                    the
                    card's content.</p> -->
              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
              <!-- </div> -->
            </div>
            <!-- </div> -->
            <!-- </div> -->
            <!-- </div> -->
            <!-- <div class="card">
              <div class="card-body"> -->
            <div class="col-md-8">
              <Logo />
              <form @submit.prevent="">
                <div class="mb-3">
                  <label for="name" class="form-label">이름</label>
                  <input v-model="formData.name" v-show="isModify" type="text" class="form-control" id="name"
                    placeholder="이름 입력" />
                  <div v-show="!isModify" class="">{{ presentData.name }}</div>
                </div>
                <div v-show="!isModify" class="mb-3">
                  <label for="email" class="form-label">아이디</label>
                  <div v-show="!isModify" class="">{{ presentData.email }}</div>
                  <!-- <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                    placeholder="이메일 주소 입력" /> -->
                </div>
                <!-- <div class="mb-2">
                  <label for="password" class="form-label">비밀번호</label>
                  <div class="">*********</div>
                  <input hidden type="password" class="form-control" id="password" placeholder="비밀번호 입력">
                </div> -->
                <!-- <div class="mb-2">
                  <input hidden type="password" class="form-control" id="password2" placeholder="비밀번호 확인">
                </div> -->

                <!-- <div class="mb-2">
                  <label for="address" class="form-label">주소</label>
                  <input v-show="isModify" type="text" class="form-control" id="address" placeholder="주소 입력" />
                  <div class="">{{ formData.address }}</div>
                </div> -->

                <div class="mb-3">
                  <label for="address" class="form-label ">주소</label>
                  <div v-show="isModify">
                    <div class="row">
                      <div class="col-lg-4">
                        <input class="form-control mb-2" type="text" placeholder="우편번호" v-model="data.zonecode"
                          readonly />
                      </div>
                      <div class="col-lg-2">
                        <button class="btn btn-light text-primary mb-2" id="postcode"
                          @click.self.prevent="openPostcode">
                          검색
                        </button>

                      </div>
                    </div>
                    <div class="mb-3">
                      <input class="col form-control" type="text" v-model="data.roadAddress" placeholder="주소"
                        readonly />
                    </div>
                    <div class="mb-3">
                      <input class="col form-control" type="text" v-model="data.detailAddress" placeholder="상세주소" />
                    </div>
                  </div>
                  <div v-show="!isModify">
                    <div class="">{{ presentData.address }}</div>
                  </div>

                </div>

                <div class="mb-5">
                  <label for="phoneNumber" class="form-label">휴대폰 번호</label>
                  <input v-show="isModify" type="tel" class="form-control" id="phoneNumber" placeholder="휴대폰 번호 입력" />
                  <div v-show="!isModify" class="">{{ presentData.phoneNumber }}</div>
                </div>

                <button @click="() => {
                  resetData();
                  setModifyTrue();
                }
                  " v-show="!isModify && !isImageChanged" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">회원정보
                  수정</button>
                <div class="d-flex">
                  <!-- <div> -->
                  <button @click="() => {
                    setFalse();
                  }" v-show="isModify || isImageChanged"
                    class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2 ms-3 me-3">
                    적용
                  </button>
                  <!-- </div> -->
                  <!-- <div> -->
                  <button @click="() => {
                    resetData();
                    setFalse();
                  }
                    " v-show="isModify || isImageChanged"
                    class="btn btn-light w-100 py-8 fs-4 mb-4 rounded-2 ms-3 me-3">
                    취소
                  </button>
                  <!-- </div> -->
                </div>
                <div class="d-flex justify-content-around"></div>
              </form>
              <!-- </div>
                </div> -->
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<style scoped></style>
