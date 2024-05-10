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
                  <h5 class="text-center text-black">로그인하고 </h5>
                  <h4 class="text-center text-black font-weight-bold">다양한 서비스를 경험해 보세요.</h4>
                  <form>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">아이디</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="이메일 주소 입력">
                    </div>
                    <div class="mb-4">
                      <label for="exampleInputPassword1" class="form-label">비밀번호</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="비밀번호 입력">
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-4">
                      <div class="form-check">
                        <input class="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked>
                        <label class="form-check-label text-dark" for="flexCheckChecked">
                          아이디 저장
                        </label>
                      </div>
                    </div>
                    <a href="./index.html" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">로그인</a>
                    <div class="row d-flex justify-content-around">
                      <div class="col-6 text-center border-right">
                        <a class="text-primary fw-bold ms-2" href="./authentication-register.html">회원가입</a>
                      </div>
                      <div class="col-6 text-center">
                        <a class="text-primary fw-bold " href="./authentication-register.html">비밀번호 찾기</a>
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
</style>