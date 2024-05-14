<script setup></script>

<template>
  <div class="justify-content-center">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top navbar-light bg-light p-3">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <div>
          <button class="navbar-toggler me-3" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a href="/" class="text-nowrap logo-img">
            <img src="../assets/images/logos/logo.svg" alt="" />
          </a>
        </div>

        <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link text-dark fs-6 me-2" href="/"> Main</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark fs-6 me-2" href="/apt"> APT</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark fs-6 me-2" href="#"> Community</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark fs-6 me-2" href="#"> My Feed</a>
            </li>
          </ul>
        </div>

        <div class="ms-3 d-flex justify-content-end">
          <a class="nav-link" href="javascript:void(0)" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="@/assets/images/profile/user-1.jpg" alt="" width="35" height="35" class="rounded-circle" />
          </a>
          <div class="dropdown-menu dropdown-menu-end animate slideIn dropdown-menu-animate-up" aria-labelledby="drop2">
            <div class=" message-body">
              <div class="w-100 limited-width">
                <router-link :to="{ name: 'profile' }" class="d-flex      align-items-center dropdown-item">
                  <i class="ti ti-user fs-6"></i>
                  <p class="mb-0 ms-1 fs-3">My Profile</p>
                </router-link>
              </div>
              <a href="./authentication-login.html" class="btn btn-light mx-3 mt-2 p-0 d-block">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<style scoped>
.limited-width {
  max-width: 130px;
  /* 원하는 최대 폭 설정 */
  margin: 0 auto;
  /* 중앙 정렬 */
}

@media (min-width: 768px) {
  .animate {
    animation-duration: 0.3s;
    -webkit-animation-duration: 0.3s;
    animation-fill-mode: both;
    -webkit-animation-fill-mode: both;
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(1rem);
    opacity: 0;
  }

  100% {
    transform: translateY(0rem);
    opacity: 1;
  }

  0% {
    transform: translateY(1rem);
    opacity: 0;
  }
}

@-webkit-keyframes slideIn {
  0% {
    -webkit-transform: transform;
    -webkit-opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    -webkit-opacity: 1;
  }

  0% {
    -webkit-transform: translateY(1rem);
    -webkit-opacity: 0;
  }
}

.slideIn {
  -webkit-animation-name: slideIn;
  animation-name: slideIn;
}
</style>
