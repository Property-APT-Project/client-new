<script setup>
import Logo from "./Logo.vue";
import { ref } from "vue"

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
  <div>
    <!--  Body Wrapper -->
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <div
        class="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div class="d-flex align-items-center justify-content-center w-100">
          <div class="row justify-content-center w-100">
            <div class="col-md-8 col-lg-6">
              <div class="card mb-0">
                <div class="card-body text-nowrap">
                  <Logo />
                  <h4 class="text-center text-black font-weight-bold">회원가입하여 계정을 만드세요!</h4>
                  <div class="row justify-content-center">
                    <div class="col-4 d-flex align-items-center justify-content-center">
                      <div class="row">
                        <div class="col">
                          <img src="@/assets/images/profile/user-1.jpg" id="profileImage" class="card-img img-thumbnail"
                            alt="..." />
                        </div>
                        <div class="d-flex mt-2 justify-content-center">
                          <label class="btn btn-light text-primary text-nowrap">
                            사진 등록/수정
                            <input hidden ref="image" id="profileImageInput" type="file" name="image" accept="image/*"
                              multiple="multiple" @change="uploadImage">
                          </label>
                        </div>
                      </div>
                    </div>
                    <!-- <form> -->
                    <div class="col-md d-flex flex-column justify-content-between">
                      <div class="mb-2 ">
                        <label for="email" class="form-label">아이디</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                          placeholder="이메일 주소 입력">
                      </div>
                      <div class="mb-2">
                        <label for="password" class="form-label">비밀번호</label>
                        <input type="password" class="form-control" id="password" placeholder="비밀번호 입력">
                      </div>
                      <div class="mb-2">
                        <input type="password" class="form-control" id="password2" placeholder="비밀번호 확인">
                      </div>
                      <div class="mb-2">
                        <label for="name" class="form-label">이름</label>
                        <input type="text" class="form-control" id="name" placeholder="이름 입력">
                      </div>
                    </div>

                    <div class="col-md d-flex flex-column justify-content-between">
                      <div class="mb-3">
                        <label for="address" class="form-label ">주소</label>
                        <!-- <div> -->
                        <div class="row">
                          <div class="col">
                            <input class="form-control mb-2" type="text" placeholder="우편번호" v-model="data.zonecode"
                              readonly />
                          </div>
                          <div class="col text-nowrap">
                            <button class="btn btn-light text-primary mb-2" id="postcode"
                              @click.self.prevent="openPostcode">
                              검색
                            </button>
                          </div>
                        </div>
                        <div class="mb-2">
                          <input class="col form-control" type="text" v-model="data.roadAddress" placeholder="주소"
                            readonly />
                        </div>
                        <div class="mb-3">
                          <input class="col form-control" type="text" v-model="data.detailAddress" placeholder="상세주소" />
                        </div>
                      </div>
                      <!-- </div> -->
                      <!-- <div class="mb-2">
                        <label for="address" class="form-label">주소</label>
                        <input type="text" class="form-control" id="address" placeholder="주소 입력">
                        </div> -->
                      <div class="mb-2 mt-1">
                        <label for="phoneNumber" class="form-label">휴대폰 번호</label>
                        <input type="tel" class="form-control" id="phoneNumber" placeholder="휴대폰 번호 입력">
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-4">

                      </div>
                      <div class="col-md-8 mt-3">
                        <button class="btn btn-primary w-100 py-8 fs-4 mx-1 mb-4 rounded-2 text-center">회원가입 완료</button>
                      </div>
                    </div>

                    <div class="d-flex justify-content-around">
                    </div>
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
</style>