<script setup>
import Signup from "./Signup.vue";
import { onBeforeMount, ref, watch } from "vue";
import { useTokenStore } from "@/stores/token";
import { useRouter } from "vue-router";
import axios from "axios";
import Logo from "./Logo.vue";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

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

async function sendData() {
  if (isImageChanged) {
    formData.value.imgURL = imgURL.value;
  }
  if (isAddressChanged) {
    formData.value.address =
      address.value.zonecode +
      " " +
      address.value.roadAddress +
      " " +
      address.value.detailAddress;
  }
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);
  console.log(formData.value);
  axios
    .put(VITE_APP_PROFILE, formData.value, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      console.log("SUCCESS");
      console.log(response.data);
      getData();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function resetData() {
  console.log("RESET DATA");
  Object.assign(formData.value, presentData.value);

  setFalse;
  // formData.value = presentData.value
}

function changeState() {
  isModify.value = !isModify.value;
}

const isAddressChanged = ref("false");
const address = ref({
  zonecode: "",
  roadAddress: "",
  detailAddress: "",
});

function openPostcode() {
  new window.daum.Postcode({
    oncomplete: (d) => {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분
      address.value.zonecode = d.zonecode;
      address.value.roadAddress = d.roadAddress;
      isAddressChanged.value = true;
    },
  }).open();
}

const file = ref("");
const imgURL = ref("");
async function uploadImage(event) {
  const files = event.target?.files;
  file.value = files[0];
  await base64(file.value);

  const form = new FormData();
  form.append("file", file.value);
  await axios
    .post(VITE_APP_API_MEMBER_UPLOAD, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      imgURL.value = response.data;
      console.log("Image uploaded successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const isImageChanged = ref(false);
const setTrue = () => {
  isImageChanged.value = true;
  console.log(isImageChanged.value);
};
const setModifyTrue = () => {
  isModify.value = true;
};
const setFalse = () => {
  isImageChanged.value = false;
  isModify.value = false;
  isAddressChanged.value = false;
  console.log(isImageChanged.value);
};
function base64(file) {
  return new Promise((resolve) => {
    let a = new FileReader();
    a.onload = (e) => {
      resolve(e.target.result);
      const previewImage = document.getElementById("profileImage");
      previewImage.src = e.target.result;
    };

    a.readAsDataURL(file);
    setTrue();
  });
}

// PHONENUMBER START //
const phoneValid = ref(true);
const showPhoneHint = ref(false);

const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^010-[0-9]{4}-[0-9]{4}$/;
  return phoneRegex.test(phoneNumber);
};

watch(
  () => formData.value.phoneNumber,
  (newPhoneNumber) => {
    phoneValid.value = validatePhoneNumber(newPhoneNumber);
    showPhoneHint.value = newPhoneNumber.length > 0 && !phoneValid.value;
  }
);
// PHONENUMBER END //

function validateForm() {
  phoneValid.value =
    !formData.value.phoneNumber ||
    validatePhoneNumber(formData.value.phoneNumber);

  showPhoneHint.value =
    formData.value.phoneNumber.length > 0 && !phoneValid.value;

  return phoneValid.value;
}

const handleSubmit = () => {
  if (validateForm()) {
    if (isImageChanged.value) {
      resetData();
    }

    sendData();
    setFalse();
  } else {
    if (formData.value.phoneNumber.length > 0 && !phoneValid.value) {
      document.getElementById("phoneNumber").classList.add("shake");
      setTimeout(() => {
        document.getElementById("phoneNumber").classList.remove("shake");
      }, 500);
    }
  }
};

const leave = async () => {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);
  console.log(token.accessToken);
  axios
    .delete(VITE_APP_MEMBER_DELETE, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      console.log("SUCCESS");
      console.log(response.data);
      Swal.fire({
        text: "탈퇴 되었습니다.",
        icon: "success",
      });
      router.replace({ name: "root" });
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        text: "에러가 발생하였습니다.",
        icon: "error",
      });
    });
};

function handleLogout() {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);
  console.log(token);
  axios
    .post(VITE_APP_LOGOUT, null, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      console.log("로그아웃 완료");
      console.log(response.data);
      Cookies.remove("authToken");
      // TODO
      router.replace({ name: "root" });
    })
    .catch((error) => {
      console.log("로그아웃 실패");
      console.error("Error:", error);
      // router.replace({ name: "community" });
    });
}

function handleLeave() {
  Swal.fire({
    title: "정말로 탈퇴하시겠습니까?",
    text: "모든 정보가 삭제되며 돌이킬 수 없습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "네, 탈퇴하겠습니다",
    cancelButtonText: "아니오, 하지않겠습니다",
  }).then((result) => {
    if (result.isConfirmed) {
      handleLogout();
      leave();
    }
  });
}
</script>

<template>
  <div
    class="page-wrapper"
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    data-sidebartype="full"
    data-sidebar-position="fixed"
    data-header-position="fixed"
  >
    <div
      class="position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center text-nowrap"
    >
      <!-- <div class="d-flex"> -->
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <h5 class="card-title fw-semibold mb-5">회원정보</h5>
              <!-- <div class="card"> -->
              <div class="d-flex card-body justify-content-center p-3">
                <img
                  :src="`${VITE_APP_API_MEMBER_UPLOAD}/${presentData.imgURL}`"
                  id="profileImage"
                  class="card-img img-thumbnail rounded profile-img"
                  alt="..."
                />
              </div>
              <div class="d-flex justify-content-center">
                <label class="btn btn-light text-primary">
                  사진변경
                  <input
                    hidden
                    ref="image"
                    id="profileImageInput"
                    type="file"
                    name="image"
                    accept="image/*"
                    multiple="multiple"
                    @change="uploadImage"
                  />
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
              <div v-if="!isModify" class="form-label">기본 보안 설정</div>
              <div
                v-if="!isModify"
                class="mb-2 d-flex shadow rounded justify-content-between align-middle full-width-flex-pass"
              >
                <label for="password" class="form-label pt-2">비밀번호</label>
                <div class="">
                  <router-link
                    :to="{ name: 'newPW' }"
                    class="btn btn-light p-1 text-primary"
                  >
                    변경
                  </router-link>
                </div>
                <input
                  hidden
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="비밀번호 입력"
                />
              </div>
              <form @submit.prevent="">
                <div class="form-label">나의 프로필</div>
                <div class="shadow rounded full-width-flex-profile mb-2">
                  <div class="mb-3">
                    <label for="name" class="form-label">이름</label>
                    <input
                      v-model="formData.name"
                      v-show="isModify"
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder="이름 입력"
                    />
                    <div v-show="!isModify" class="">
                      {{ presentData.name }}
                    </div>
                  </div>
                  <div v-show="!isModify" class="mb-3">
                    <label for="email" class="form-label">아이디</label>
                    <div v-show="!isModify" class="">
                      {{ presentData.email }}
                    </div>
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
                    <label for="address" class="form-label">주소</label>
                    <div v-show="isModify">
                      <div class="row">
                        <div class="col-lg-4">
                          <input
                            class="form-control mb-2"
                            type="text"
                            placeholder="우편번호"
                            v-model="address.zonecode"
                            readonly
                          />
                        </div>
                        <div class="col-lg-2">
                          <button
                            class="btn btn-light text-primary mb-2"
                            id="postcode"
                            @click.self.prevent="openPostcode"
                          >
                            검색
                          </button>
                        </div>
                      </div>
                      <div class="mb-3">
                        <input
                          class="col form-control"
                          type="text"
                          v-model="address.roadAddress"
                          placeholder="주소"
                          readonly
                        />
                      </div>
                      <div class="mb-3">
                        <input
                          class="col form-control"
                          type="text"
                          v-model="address.detailAddress"
                          placeholder="상세주소"
                        />
                      </div>
                    </div>
                    <div v-show="!isModify">
                      <div class="">{{ presentData.address }}</div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="phoneNumber" class="form-label"
                      >휴대폰 번호</label
                    >
                    <input
                      v-show="isModify"
                      v-model="formData.phoneNumber"
                      type="tel"
                      class="form-control"
                      id="phoneNumber"
                      placeholder="휴대폰 번호 입력"
                    />
                    <div v-show="!isModify" class="">
                      {{ presentData.phoneNumber }}
                    </div>
                    <div v-if="showPhoneHint && !phoneValid" class="phone-hint">
                      휴대폰 번호는 010-XXXX-XXXX 형식이어야 합니다.
                    </div>
                  </div>
                </div>

                <button
                  @click="
                    () => {
                      resetData();
                      setModifyTrue();
                    }
                  "
                  v-show="!isModify && !isImageChanged"
                  class="btn btn-primary w-100 py-8 fs-4 rounded-2"
                >
                  회원정보 수정
                </button>
                <div class="d-flex">
                  <!-- <div> -->
                  <button
                    @click="handleSubmit"
                    v-show="isModify || isImageChanged"
                    class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2 ms-3 me-3"
                  >
                    적용
                  </button>
                  <!-- </div> -->
                  <!-- <div> -->
                  <button
                    @click="
                      () => {
                        resetData();
                        setFalse();
                      }
                    "
                    v-show="isModify || isImageChanged"
                    class="btn btn-light w-100 py-8 fs-4 mb-4 rounded-2 ms-3 me-3"
                  >
                    취소
                  </button>
                  <!-- </div> -->
                </div>
                <div class="d-flex justify-content-center">
                  <span @click="handleLeave" class="clickable p-1"> 탈퇴 </span>
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

<style scoped>
.profile-img {
  width: 100%;
  max-width: 300px;
  height: auto;
}

.full-width-flex-pass {
  /* display: flex; */
  width: 100%;
  align-items: center;
  border: 2px solid #a020f0;
  /* 경계선 추가 */
  padding: 10px;
  /* 내부 여백 추가 */
  border-radius: 5px;
  /* 모서리 둥글게 */
}

.full-width-flex-profile {
  /* display: flex; */
  width: 100%;
  align-items: center;
  border: 0px solid #d3d3d3;
  /* 경계선 추가 */
  padding: 10px;
  /* 내부 여백 추가 */
  border-radius: 5px;
  /* 모서리 둥글게 */
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

.shake {
  animation: shake 0.5s;
  border: 1px solid red;
}

.clickable {
  cursor: pointer;
  color: #d2d2d2; /* 원하는 색상으로 변경 */
}
</style>
