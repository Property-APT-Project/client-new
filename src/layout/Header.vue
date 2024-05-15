<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const collapseRef = ref(null);
const activeNavItem = ref("main");

const closeSidebar = () => {
  if (collapseRef.value) {
    const bsCollapse = new bootstrap.Collapse(collapseRef.value, {
      toggle: false,
    });
    bsCollapse.hide();
  }
};

const router = useRouter();
const handleNavItemClicked = (path, item) => {
  activeNavItem.value = item;
  closeSidebar();
  if (path) {
    router.push(path);
  }
};
</script>

<template>
  <div class="justify-content-center">
    <nav
      class="navbar navbar-expand-md navbar-dark fixed-top navbar-light bg-light p-3"
    >
      <div
        class="container-fluid d-flex justify-content-between align-items-center"
      >
        <div>
          <button
            class="navbar-toggler me-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a href="/" class="text-nowrap logo-img">
            <img src="../assets/images/logos/logo.svg" alt="" />
          </a>
        </div>

        <div
          class="collapse navbar-collapse justify-content-end no-transition"
          id="collapsibleNavbar"
          ref="collapseRef"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                :to="{ name: 'root' }"
                class="nav-link text-dark fs-6 me-2"
                :class="{ 'fw-bolder active': activeNavItem === 'main' }"
                @click.native="handleNavItemClicked(null, 'main')"
              >
                Main</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'apt' }"
                class="nav-link text-dark fs-6 me-2"
                :class="{ 'fw-bolder active': activeNavItem === 'apt' }"
                @click.native="handleNavItemClicked(null, 'apt')"
              >
                APT</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'community' }"
                class="nav-link text-dark fs-6 me-2"
                :class="{ 'fw-bolder active': activeNavItem === 'community' }"
                @click.native="handleNavItemClicked(null, 'community')"
              >
                Community</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'community' }"
                class="nav-link text-dark fs-6 me-2"
                :class="{ 'fw-bolder active': activeNavItem === 'myFeed' }"
                @click.native="handleNavItemClicked(null, 'myFeed')"
              >
                My Feed</router-link
              >
            </li>
          </ul>
        </div>

        <div class="ms-3 d-flex justify-content-end">
          <a
            class="nav-link"
            href="javascript:void(0)"
            id="drop2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="@/assets/images/profile/user-1.jpg"
              alt=""
              width="35"
              height="35"
              class="rounded-circle"
            />
          </a>
          <div
            class="dropdown-menu dropdown-menu-end animate slideIn dropdown-menu-animate-up"
            aria-labelledby="drop2"
          >
            <div class="message-body">
              <div class="w-100 limited-width">
                <router-link
                  :to="{ name: 'profile' }"
                  class="rounded-2 d-flex align-items-center dropdown-item"
                >
                  <i class="ti ti-user fs-6"></i>
                  <p class="mb-0 ms-1 fs-3">My Profile</p>
                </router-link>
              </div>
              <div class="w-100 limited-width">
                <router-link
                  :to="{ name: 'profile' }"
                  class="rounded-2 d-flex align-items-center dropdown-item"
                >
                  <i class="fa fa-sign-out ms-1 fs-4"></i>
                  <p class="mb-0 ms-2 fs-3">Logout</p>
                </router-link>
              </div>
              <!-- <a
                href="./authentication-login.html"
                class="btn btn-light mx-3 mt-2 p-0 d-block"
                >Logout</a
              > -->
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

.dropdown-menu {
  animation: 0.5s slideup;
}

@keyframes slideup {
  from {
    transform: translateY(10%);
  }

  to {
    transform: translateY(0);
  }
}

.fixed-profile {
  position: fixed;
  top: 10px; /* 원하는 위치로 조정 */
  right: 10px; /* 원하는 위치로 조정 */
  z-index: 1000; /* 다른 요소 위에 표시하기 위해 z-index 설정 */
}

.no-transition {
  transition: none !important;
}
</style>
