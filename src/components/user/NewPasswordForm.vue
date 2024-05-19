<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { defineStore } from "pinia";
import Logo from "./Logo.vue";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const { VITE_APP_API_NEW_PASS } = import.meta.env;
const router = useRouter();
const formData = ref({
  curPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const useTokenStore = defineStore("token", {
  state: () => ({
    accessToken: "",
    refreshToken: "",
  }),
});

const isVerified = ref(false);
const isRequested = ref(false);
const token = useTokenStore();
const errMsg = ref("");

// PASSWORD START //
const curPasswordValid = ref(false);
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
  () => formData.value.curPassword,
  (newCurPassword) => {
    if (newCurPassword.length > 0) {
      curPasswordValid.value = true;
    } else {
      curPasswordValid.value = false;
    }
  }
);
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
  curPasswordValid.value = formData.value.curPassword.length > 0;
  passwordValid.value = validatePassword(formData.value.newPassword);
  passwordsMatch.value =
    formData.value.newPassword === formData.value.confirmPassword;

  showPasswordHint.value = !passwordValid.value || !passwordsMatch.value;

  return curPasswordValid.value && passwordValid.value && passwordsMatch.value;
}

async function sendData() {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);
  axios
    .post(VITE_APP_API_NEW_PASS, formData.value, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      console.log("Form submitted successfully:", response.data);
      Swal.fire({
        // title: "Good job!",
        text: "변경 되었습니다.",
        icon: "success",
      }).then(() => {
        router.push({ name: "profile" });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function handleSubmit() {
  if (validateForm()) {
    sendData();
  } else {
    if (!curPasswordValid.value) {
      showError.value = true;
      document.getElementById("curPassword").classList.add("input-error");
      document.getElementById("curPassword").classList.add("shake");
      setTimeout(() => {
        showError.value = false;
        document.getElementById("curPassword").classList.remove("input-error");
        document.getElementById("curPassword").classList.remove("shake");
      }, 1000);
    }
    // Add shake class to invalid fields
    if (!passwordValid.value || !passwordsMatch.value) {
      document.getElementById("newPassword").classList.add("shake");
      document.getElementById("confirmPassword").classList.add("shake");
      setTimeout(() => {
        document.getElementById("newPassword").classList.remove("shake");
        document.getElementById("confirmPassword").classList.remove("shake");
      }, 1000);
    }
  }

  // const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
  // const recaptcha = async () => {
  //   // (optional) Wait until recaptcha has been loaded.
  //   await recaptchaLoaded();

  //   // Execute reCAPTCHA with action "login".
  //   const token = await executeRecaptcha("login");

  //   // Do stuff with the received token.
  // };
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
                  <h5 class="text-center text-black mb-4">비밀번호 변경</h5>
                  <!-- <h4 class="text-center text-black font-weight-bold">다양한 서비스를 경험해 보세요.</h4> -->
                  <form @submit.prevent="login">
                    <div class="mb-3">
                      <!-- <label for="email" class="form-label">아이디</label> -->
                      <div class="row"></div>
                    </div>

                    <div>
                      <!-- <div class="mb-2">
                        <label for="password" class="form-label">현재 비밀번호</label>
                      </div> -->
                      <div class="mb-2">
                        <input
                          v-model="formData.curPassword"
                          type="password"
                          class="mb-3 form-control"
                          id="curPassword"
                          :placeholder="placeholderText"
                        />
                      </div>
                    </div>
                    <div>
                      <div class="mb-2">
                        <!-- <label for="password" class="form-label">비밀번호</label> -->
                        <input
                          v-model="formData.newPassword"
                          type="password"
                          class="mt-2 form-control"
                          id="newPassword"
                          placeholder="새 비밀번호"
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

                    <form action="?" method="POST">
                      <div
                        class="g-recaptcha d-flex justify-content-center"
                        data-sitekey="6Le5sdspAAAAAOBfVigfow7lBkl6y97b3sIg1kzG"
                      ></div>
                      <br />
                      <input hidden type="submit" value="Captcha" />
                    </form>

                    <div class="mb-2 text-center text-danger" v-if="errMsg">
                      {{ errMsg }}
                    </div>
                    <button
                      @click="handleSubmit"
                      class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                    >
                      확인
                    </button>
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

.password-hint,
.email-hint {
  color: #ff0000; /* 부트스트랩의 기본 텍스트 색상 */
  font-size: 0.875em; /* 폰트 크기를 약간 작게 설정 */
  margin-top: 0.5em; /* 위쪽 마진을 추가하여 간격 설정 */
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

.input-error::placeholder {
  color: red;
}
</style>
