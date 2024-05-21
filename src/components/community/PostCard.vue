<script setup>
import { defineProps, ref, onMounted } from "vue";
import PostDetail from "./PostDetail.vue";
import Cookies from "js-cookie";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const { VITE_APP_API_MEMBER_UPLOAD } = import.meta.env;
const { VITE_APP_API_POST_UPLOAD } = import.meta.env;

const isAuthenticated = ref(false);

onMounted(() => {
  const token = Cookies.get("authToken");
  if (token) {
    isAuthenticated.value = true;
  }
});

// 시간 데이터를 포맷하는 함수
function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, ". ");

  const formattedTime = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate} ${formattedTime}`;
}
</script>

<template>
  <div class="card-container w-75">
    <div
      class="card overflow-hidden hover-img"
      :class="{ blur: !isAuthenticated }"
    >
      <div class="position-relative">
        <!-- <a href="javascript:void(0)">
          <img
            src="@/assets/images/blog/blog-img1.jpg"
            class="post-image"
            alt="matdash-img"
          />
        </a> -->
        <router-link :to="{ name: 'postDetail', params: { id: post.id } }">
          <a href="javascript:void(0)">
            <img
              :src="`${VITE_APP_API_POST_UPLOAD}/${post.imgURL}`"
              class="post-image"
              alt="matdash-img"
            />
          </a>
        </router-link>
        <img
          :src="`${VITE_APP_API_MEMBER_UPLOAD}/${post.profileImgURL}`"
          alt="matdash-img"
          class="rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
          width="40"
          height="40"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-title="Georgeanna Ramero"
        />
      </div>
      <div class="card-body p-4">
        <router-link
          :to="{ name: 'postDetail', params: { id: post.id } }"
          class="d-block my-4 fs-5 text-dark fw-semibold link-primary"
          href=""
          >{{ post.title }}</router-link
        >

        <div class="d-flex align-items-center gap-4">
          <div class="d-flex align-items-center gap-2">
            <i class="ti ti-eye text-dark fs-5"></i> {{ post.hit }}
          </div>
          <div class="d-flex align-items-center gap-2">
            <i class="ti ti-message-2 text-dark fs-5"></i>
            {{ post.comments.length }}
          </div>
          <div class="d-flex align-items-center fs-2 ms-auto">
            <i class="ti ti-point text-dark"></i>
            {{ formatDate(post.createTime) }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isAuthenticated" class="overlay">
      <div class="overlay-card text-center p-3">
        <div class="mb-3 text-black">로그인하고 커뮤니티 참여하기</div>
        <router-link :to="{ name: 'loginForm' }" class="btn btn-primary">
          <i class="fa-solid fa-lock"></i> 로그인
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0);
  z-index: 10;
}

.overlay-card {
  background-color: rgb(247, 246, 246);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.blur-container {
  position: relative;
  overflow: hidden;
}

.blur {
  filter: blur(10px);
  -webkit-filter: blur(10px); /* Safari 지원 */
  pointer-events: none; /* 클릭 방지 */
}

.post-image {
  width: 100%;
  height: auto;

  object-fit: cover; /* 이미지가 잘리지 않도록 설정 */
}

.rounded-circle {
  object-fit: cover;
}
</style>
