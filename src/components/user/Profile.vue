<script setup>
import Signup from "./Signup.vue";
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
              <img src="@/assets/images/profile/user-1.jpg" class="card-img" alt="...">
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
              <a href="./index.html" class="text-nowrap logo-img text-center d-block py-3 w-100">
                <img src="@/assets/images/logos/logo.svg" alt="">
              </a>
              <form>
                <div class="mb-2">
                  <label for="name" class="form-label">이름</label>
                  <input hidden type="text" class="form-control" id="name" placeholder="이름 입력">
                  <div class="">kimssafy</div>
                </div>
                <div class="mb-2">
                  <label for="email" class="form-label">아이디</label>
                  <div class="">ssafy@gmail.com</div>
                  <input hidden type="email" class="form-control" id="email" aria-describedby="emailHelp"
                    placeholder="이메일 주소 입력">
                </div>
                <!-- <div class="mb-2">
                  <label for="password" class="form-label">비밀번호</label>
                  <div class="">*********</div>
                  <input hidden type="password" class="form-control" id="password" placeholder="비밀번호 입력">
                </div> -->
                <!-- <div class="mb-2">
                  <input hidden type="password" class="form-control" id="password2" placeholder="비밀번호 확인">
                </div> -->

                <div class="mb-2">
                  <label for="address" class="form-label">주소</label>
                  <input hidden type="text" class="form-control" id="address" placeholder="주소 입력">
                  <div class="">멀티캠퍼스</div>
                </div>
                <div class="mb-5">
                  <label for="phoneNumber" class="form-label">휴대폰 번호</label>
                  <input hidden type="tel" class="form-control" id="phoneNumber" placeholder="휴대폰 번호 입력">
                  <div class="">123-4567</div>
                </div>

                <a href="./index.html" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">회원가입 완료</a>
                <div class="d-flex justify-content-around">
                </div>
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