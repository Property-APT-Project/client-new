<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { defineStore } from 'pinia';
import Logo from "./Logo.vue";


const { VITE_APP_API_URL, VITE_APP_LOGIN, VITE_APP_PROFILE } = import.meta.env
const router = useRouter()
const formData = ref({
  curPassword: '',
  password1: '',
  password2: '',
})
const useTokenStore = defineStore('token', {
  state: () => ({
    accessToken: '',
    refreshToken: ''
  })
})

const isVerified = ref(false)
const isRequested = ref(false)
const token = useTokenStore()
const errMsg = ref('')

async function login() {
  console.log(VITE_APP_API_URL)
  await axios.post(VITE_APP_LOGIN,
    formData.value)
    .then(response => {
      console.log("SUCCESS")
      console.log(response.data)
      // console.log(response.data.accessToken)
      // TODO
      router.replace({ name: 'root' })
      token.accessToken = response.data.accessToken
      token.refreshToken = response.data.refreshToken
      console.log(token)
    }).catch(error => {
      errMsg.value = "인증번호가 일치하지 않습니다."
      console.error('Error:', error)
    })

  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
  const recaptcha = async () => {
    // (optional) Wait until recaptcha has been loaded.
    await recaptchaLoaded()

    // Execute reCAPTCHA with action "login".
    const token = await executeRecaptcha('login')

    // Do stuff with the received token.
  }
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
    <!-- <div class="row">
      <div class="col-4">.col-sm-4</div>
      <div class="col-4">.col-sm-4</div>
      <div class="col-4">.col-sm-4</div>
    </div> -->
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <div
        class="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div class="d-flex align-items-center justify-content-center w-100">
          <div class="row justify-content-center w-100">
            <div class="col-md-8 col-lg-6 col-xxl-4">
              <div class="card mb-0">
                <div class="card-body text-nowrap">
                  <Logo />
                  <!-- <a href="./index.html" class="text-nowrap logo-img text-center d-block py-3 w-100"> -->

                  <!-- </a> -->
                  <h5 class="text-center text-black mb-4"> 비밀번호 변경 </h5>
                  <!-- <h4 class="text-center text-black font-weight-bold">다양한 서비스를 경험해 보세요.</h4> -->
                  <form @submit.prevent="login">
                    <div class="mb-3">
                      <!-- <label for="email" class="form-label">아이디</label> -->
                      <div class="row">
                      </div>
                    </div>

                    <div>
                      <!-- <div class="mb-2">
                        <label for="password" class="form-label">현재 비밀번호</label>
                      </div> -->
                      <div class="mb-2">
                        <input v-model="formData.curPassword" type="password" class="mb-3 form-control" id="curPassword"
                          placeholder="현재 비밀번호">
                      </div>
                    </div>
                    <div>
                      <div class="mb-2">
                        <!-- <label for="password" class="form-label">비밀번호</label> -->
                        <input v-model="formData.password1" type="password" class="mt-2 form-control" id="password1"
                          placeholder="새 비밀번호">
                      </div>
                      <div class="mb-2">
                        <input v-model="formData.password2" type="password" class="mb-3 form-control" id="password2"
                          placeholder="비밀번호 확인">
                      </div>
                    </div>

                    <form action="?" method="POST">
                      <div class="g-recaptcha d-flex justify-content-center"
                        data-sitekey="6Le5sdspAAAAAOBfVigfow7lBkl6y97b3sIg1kzG"></div>
                      <br />
                      <input hidden type="submit" value="Captcha">
                    </form>

                    <div class="mb-2 text-center text-danger" v-if="errMsg">{{ errMsg }}</div>
                    <button :disabled="!formData.curPassword || !formData.password1 || !formData.password2"
                      class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">확인</button>
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
</style>