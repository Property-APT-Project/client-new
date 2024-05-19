<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useTokenStore } from "@/stores/token";
import Logo from "./Logo.vue";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const { VITE_APP_API_URL, VITE_APP_LOGIN, VITE_APP_PROFILE } = import.meta.env;
const router = useRouter();
const formData = ref({
  email: "",
  password: "",
});

const token = useTokenStore();
const errMsg = ref("");
const rememberMe = ref(true);

onMounted(() => {
  const savedEmail = localStorage.getItem("savedEmail");
  if (savedEmail) {
    formData.value.email = savedEmail;
    rememberMe.value = true;
  }
});

async function login() {
  console.log(VITE_APP_API_URL);
  await axios
    .post(VITE_APP_LOGIN, formData.value)
    .then((response) => {
      console.log("SUCCESS");
      // console.log(response.data);

      const token = response.data;
      Cookies.set("authToken", JSON.stringify(token), {
        expires: 7,
        sameSite: "strict",
      });

      console.log(rememberMe.value);
      if (rememberMe.value) {
        localStorage.setItem("savedEmail", formData.value.email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      Swal.fire({
        // title: "",
        text: "로그인 되었습니다.",
        icon: "success",
      }).then(() => {
        router.replace({ name: "root" });
      });

      console.log("로그인 성공 및 쿠키 설정");
      // token.accessToken = response.data.accessToken;
      // token.refreshToken = response.data.refreshToken;
      console.log(token);
    })
    .catch((error) => {
      errMsg.value = "아이디 또는 비밀번호가 일치하지 않습니다.";
      console.error("Error:", error);
    });
  //   axios.get(VITE_APP_PROFILE,
  // {
  //   headers: {
  //     'Authorization': 'Bearer ' + token.accessToken
  //   }
  // })
  //   .then(response => {
  //     console.log("PROFILE " + response.data)
  //     console.log(response.data)
  //   }).catch(error => {
  //     console.error('Error:', error)
  //   })
}
</script>

<template>
  <div>
    <!--  Body Wrapper -->
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
        class="position-relative overflow-hidden min-vh-100 d-flex align-items-center justify-content-center"
      >
        <div class="d-flex align-items-center justify-content-center w-100">
          <div class="row justify-content-center w-100">
            <div class="col-md-8 col-lg-6 col-xxl-3">
              <div class="card mb-0">
                <div class="card-body">
                  <Logo />
                  <!-- <a href="./index.html" class="text-nowrap logo-img text-center d-block py-3 w-100"> -->

                  <!-- </a> -->
                  <h5 class="text-center text-black">로그인하고</h5>
                  <h4 class="text-center text-black font-weight-bold">
                    다양한 서비스를 경험해 보세요.
                  </h4>
                  <form @submit.prevent="login">
                    <div class="mb-3">
                      <label for="email" class="form-label">아이디</label>
                      <input
                        type="email"
                        v-model="formData.email"
                        class="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="이메일 주소 입력"
                      />
                    </div>
                    <div class="mb-4">
                      <label for="password" class="form-label">비밀번호</label>
                      <input
                        type="password"
                        v-model="formData.password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="비밀번호 입력"
                      />
                    </div>
                    <div
                      class="d-flex align-items-center justify-content-between mb-3"
                    >
                      <div class="form-check">
                        <input
                          v-model="rememberMe"
                          class="form-check-input primary"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          checked
                        />
                        <label
                          class="form-check-label text-dark"
                          for="flexCheckChecked"
                        >
                          아이디 저장
                        </label>
                      </div>
                    </div>
                    <div class="mb-2 text-center fail" v-if="errMsg">
                      {{ errMsg }}
                    </div>
                    <button
                      :disabled="!formData.email || !formData.password"
                      class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                    >
                      로그인
                    </button>
                    <div class="row d-flex justify-content-around">
                      <div class="col-6 text-center border-right">
                        <router-link
                          :to="{ name: 'signupForm' }"
                          class="text-primary fw-bold ms-2"
                          >회원가입</router-link
                        >
                        <!-- <a class="text-primary fw-bold ms-2" href="./authentication-register.html">회원가입</a> -->
                      </div>
                      <div class="col-6 text-center">
                        <router-link
                          :to="{ name: 'pwService' }"
                          class="text-primary fw-bold"
                          >비밀번호 찾기</router-link
                        >
                        <!-- <a class="text-primary fw-bold " href="./authentication-register.html">비밀번호 찾기</a> -->
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  color: gray;
}

.font-weight-bold {
  font-weight: bold;
}

.border-right {
  border-right: 1px solid #d5ccf7;
}

.fail {
  color: red;
}
</style>
