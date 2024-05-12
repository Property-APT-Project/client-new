<script setup>

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
            <div class="col-md-8 col-lg-6 col-xxl-3">
              <div class="card mb-0">
                <div class="card-body">
                  <a href="./index.html" class="text-nowrap logo-img text-center d-block py-3 w-100">
                    <img src="@/assets/images/logos/logo.svg" alt="">
                  </a>
                  <h4 class="text-center text-black font-weight-bold">회원가입하여 계정을 만드세요!</h4>
                  <form>
                    <div class="mb-2">
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
                    <div class="mb-2">
                      <label for="address" class="form-label">주소</label>
                      <input type="text" class="form-control" id="address" placeholder="주소 입력">
                    </div>
                    <div class="mb-5">
                      <label for="phoneNumber" class="form-label">휴대폰 번호</label>
                      <input type="tel" class="form-control" id="phoneNumber" placeholder="휴대폰 번호 입력">
                    </div>

                    <a href="./index.html" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">회원가입 완료</a>
                    <div class="d-flex justify-content-around">
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
</style>