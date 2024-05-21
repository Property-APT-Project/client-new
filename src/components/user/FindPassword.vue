<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { defineStore } from "pinia";
import Logo from "./Logo.vue";
import Swal from "sweetalert2";

const {
  VITE_APP_API_URL,
  VITE_APP_LOGIN,
  VITE_APP_PROFILE,
  VITE_APP_API_RESET_PASSWORD_REQUEST,
  VITE_APP_API_RESET_PASSWORD_RESET,
} = import.meta.env;
const router = useRouter();
// const formData = ref({
//   email: "",
//   password: "",
// });

const isVerified = ref(false);
const isRequested = ref(false);
const errMsg = ref("");

const email = ref("");
const message = ref("");
const minutes = ref(5);
const seconds = ref(0);
let timer;

const startTimer = () => {
  clearInterval(timer); // 기존 타이머 정리
  let totalTime = 5 * 60; // 5분 초기화
  timer = setInterval(() => {
    totalTime--;
    minutes.value = Math.floor(totalTime / 60);
    seconds.value = totalTime % 60;
    if (totalTime <= 0) {
      clearInterval(timer);
      isRequested.value = false;
      minutes.value = 5;
      seconds.value = 0;
    }
  }, 1000);
};

const requestPasswordReset = () => {
  axios
    .post(VITE_APP_API_RESET_PASSWORD_REQUEST, null, {
      params: { email: email.value },
    })
    .then((response) => {
      message.value = "인증 메일이 발송되었습니다";
      // alert(message.value);
      // message.value = response.data;
      isRequested.value = true;

      startTimer();
    })
    .catch((error) => {
      message.value = error.response.data;
    });
};

const tokenInStorage = ref(false);
const checkToken = () => {
  const storedToken = localStorage.getItem("resetToken");
  if (storedToken) {
    tokenInStorage.value = true;
  } else {
    tokenInStorage.value = false;
  }
};

onMounted(() => {
  localStorage.removeItem("resetToken");
  setInterval(checkToken, 1000); // 1초마다 토큰 확인
});

const formData = ref({
  newPassword: "",
  confirmPassword: "",
});

const resetPassword = () => {
  const token = localStorage.getItem("resetToken");
  axios
    .post(VITE_APP_API_RESET_PASSWORD_RESET, formData.value, {
      params: { token },
    })
    .then((response) => {
      message.value = response.data;

      localStorage.removeItem("resetToken");
      // tokenInStorage.value = false;
      formData.value.newPassword = "";
      formData.value.confirmPassword = "";
      Swal.fire({
        // title: "Good job!",
        text: "변경 되었습니다.",
        icon: "success",
      }).then(() => {
        router.push({ name: "loginForm" });
      });
    })
    .catch((error) => {
      errMsg.value = "Error: " + error;
    });
};

// PASSWORD START //
const showPasswordHint = ref(false);
const passwordValid = ref(false);
const passwordsMatch = ref(true);

const showError = ref(false);
const placeholderText = computed(() => {
  return showError.value ? "비밀번호를 입력하세요." : "현재 비밀번호";
});

const validatePassword = (password) => {
  const hasNumber = /[0-9]/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  const hasTwoSpecialChars =
    password.replace(/[^a-zA-Z0-9]/g, "").length <= password.length - 2;
  const isLongEnough = password.length >= 8;
  return hasNumber && hasLetter && hasTwoSpecialChars && isLongEnough;
};

watch(
  () => formData.value.newPassword,
  (newPassword) => {
    passwordValid.value = validatePassword(newPassword);
    if (formData.value.confirmPassword != "") {
      passwordsMatch.value =
        formData.value.newPassword === formData.value.confirmPassword;
    }
    if (passwordValid.value && passwordsMatch.value) {
      showPasswordHint.value = false;
    } else {
      showPasswordHint.value = true;
    }
  }
);

watch(
  () => formData.value.confirmPassword,
  (newConfirmPassword) => {
    passwordsMatch.value = formData.value.newPassword === newConfirmPassword;
    if (passwordValid.value && passwordsMatch.value) {
      showPasswordHint.value = false;
    } else {
      showPasswordHint.value = true;
    }
  }
);
// PASSWORD END //

function validateForm() {
  passwordValid.value = validatePassword(formData.value.newPassword);
  passwordsMatch.value =
    formData.value.newPassword === formData.value.confirmPassword;

  showPasswordHint.value = !passwordValid.value || !passwordsMatch.value;

  return passwordValid.value && passwordsMatch.value;
}

async function handleSubmit() {
  if (validateForm()) {
    resetPassword();
  } else {
    // Add shake class to invalid fields
    console.log(passwordValid.value);
    console.log(passwordsMatch.value);
    if (!passwordValid.value || !passwordsMatch.value) {
      document.getElementById("newPassword").classList.add("shake");
      document.getElementById("confirmPassword").classList.add("shake");
      setTimeout(() => {
        document.getElementById("newPassword").classList.remove("shake");
        document.getElementById("confirmPassword").classList.remove("shake");
      }, 1000);
    }
  }
}
</script>

<template>
  <div>
    <!--  Body Wrapper -->
    <!-- <div class="row">
      <div class="col-4">.col-sm-4</div>
      <div class="col-4">.col-sm-4</div>
      <div class="col-4">.col-sm-4</div>
    </div> -->
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
            <div class="col-md-8 col-lg-6 col-xxl-4">
              <div class="card mb-0">
                <div class="card-body text-nowrap">
                  <Logo />
                  <!-- <a href="./index.html" class="text-nowrap logo-img text-center d-block py-3 w-100"> -->

                  <!-- </a> -->
                  <h5 class="text-center text-black mb-4">비밀번호 찾기</h5>
                  <!-- <h4 class="text-center text-black font-weight-bold">다양한 서비스를 경험해 보세요.</h4> -->
                  <!-- <form @submit.prevent="requestPasswordReset"> -->
                  <div>
                    <div class="mb-3">
                      <!-- <label for="email" class="form-label">아이디</label> -->
                      <div class="row">
                        <div class="col-8">
                          <div class="input-group">
                            <input
                              type="email"
                              v-model="email"
                              class="form-control no-right-border"
                              id="email"
                              aria-describedby="emailHelp"
                              placeholder="이메일 주소 입력"
                              @keyup.enter="requestPasswordReset"
                            />
                            <div
                              class="input-group-text transparent-text fixed-width"
                              v-if="isRequested && !tokenInStorage"
                            >
                              {{ minutes }}:{{
                                seconds < 10 ? "0" + seconds : seconds
                              }}
                            </div>
                          </div>
                        </div>
                        <!-- <div class="col-4"> -->
                        <div class="col-4">
                          <div @click="requestPasswordReset">
                            <button
                              v-if="!isRequested"
                              class="btn btn-primary w-100 text-nowrap"
                            >
                              인증 메일 요청
                            </button>
                            <button v-else class="btn btn-primary w-100">
                              재요청
                            </button>
                          </div>
                        </div>
                        <div
                          class="ms-3 mt-2 d-flex send"
                          v-if="message && !tokenInStorage"
                        >
                          {{ message }}
                        </div>
                        <!-- </div> -->
                      </div>
                    </div>
                    <!-- <div class="mb-4"> -->
                    <!-- <label for="exampleInputPassword1" class="form-label">인증번호</label> -->
                    <!-- <input :disabled="!isVerified" type="text" v-model="formData.password" class="form-control"
                        id="exampleInputPassword1" placeholder="인증번호 입력">
                    </div> -->
                    <div v-if="tokenInStorage">
                      <div class="mb-2">
                        <label for="password" class="form-label"
                          >비밀번호 *</label
                        >
                        <input
                          v-model="formData.newPassword"
                          type="password"
                          class="form-control"
                          id="newPassword"
                          placeholder="비밀번호 입력"
                          @focus="showPasswordHint = true"
                        />
                        <div
                          v-if="showPasswordHint && !passwordValid"
                          class="password-hint ms-1"
                        >
                          비밀번호는 숫자, 영문자, 특수문자(2자리 이상)를 포함한
                          8자리 이상이어야 합니다.
                        </div>
                      </div>
                      <div class="mb-2">
                        <input
                          v-model="formData.confirmPassword"
                          type="password"
                          class="form-control"
                          id="confirmPassword"
                          placeholder="비밀번호 확인"
                        />
                        <div
                          v-if="showPasswordHint && !passwordsMatch"
                          class="password-hint"
                        >
                          비밀번호가 일치하지 않습니다.
                        </div>
                      </div>
                    </div>
                    <div class="mb-2 text-center text-danger" v-if="errMsg">
                      {{ errMsg }}
                    </div>
                    <button
                      v-if="tokenInStorage"
                      @click="handleSubmit"
                      :disabled="
                        !formData.newPassword || !formData.confirmPassword
                      "
                      class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                    >
                      확인
                    </button>
                    <!-- <button
                      v-else
                      :disabled="!formData.email || !formData.password"
                      class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                    >
                      변경 완료
                    </button> -->
                    <!-- </form> -->
                  </div>
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

.password-hint,
.email-hint {
  color: #ff0000; /* 부트스트랩의 기본 텍스트 색상 */
  font-size: 0.875em; /* 폰트 크기를 약간 작게 설정 */
  margin-top: 0.5em; /* 위쪽 마진을 추가하여 간격 설정 */
}

.transparent-text {
  background-color: transparent;
  color: red;
  align-items: center;
  justify-content: center;
}

.send {
  color: red;
}

.fixed-width {
  width: 80px; /* 원하는 고정 너비로 설정 */
  text-align: center;
}
</style>
