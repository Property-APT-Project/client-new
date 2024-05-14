<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { defineStore } from 'pinia';
import Logo from "./Logo.vue";

const { VITE_APP_API_URL, VITE_APP_LOGIN, VITE_APP_PROFILE } = import.meta.env
const router = useRouter()
const formData = ref({
  email: '',
  password: '',
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
                  <h5 class="text-center text-black mb-4"> 비밀번호 찾기 </h5>
                  <!-- <h4 class="text-center text-black font-weight-bold">다양한 서비스를 경험해 보세요.</h4> -->
                  <form @submit.prevent="login">
                    <div class="mb-3">
                      <!-- <label for="email" class="form-label">아이디</label> -->
                      <div class="row">
                        <div class="col-8">
                          <input type="email" v-model="formData.email" class="form-control" id="email"
                            aria-describedby="emailHelp" placeholder="이메일 주소 입력">
                        </div>
                        <!-- <div class="col-4"> -->
                        <div class="col-4">
                          <div class="">
                            <button v-if="!isRequested" class="btn btn-primary w-100 text-nowrap">인증번호 요청</button>
                            <button v-else class="btn btn-primary w-100"> 재요청</button>
                          </div>
                        </div>
                        <!-- </div> -->
                      </div>
                    </div>
                    <div class="mb-4">
                      <!-- <label for="exampleInputPassword1" class="form-label">인증번호</label> -->
                      <input :disabled="!isVerified" type="text" v-model="formData.password" class="form-control"
                        id="exampleInputPassword1" placeholder="인증번호 입력">
                    </div>
                    <div v-show="isVerified">
                      <div class="mb-2">
                        <label for="password" class="form-label">비밀번호</label>
                        <input type="password" class="mt-2 form-control" id="password" placeholder="비밀번호 입력">
                      </div>
                      <div class="mb-2">
                        <input type="password" class="mb-3 form-control" id="password2" placeholder="비밀번호 확인">
                      </div>
                    </div>
                    <div class="mb-2 text-center text-danger" v-if="errMsg">{{ errMsg }}</div>
                    <button v-if="!isVerified" :disabled="!formData.email || !formData.password"
                      class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">확인</button>
                    <button v-else :disabled="!formData.email || !formData.password"
                      class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">변경 완료</button>
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