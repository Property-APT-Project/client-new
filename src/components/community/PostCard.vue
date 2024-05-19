<script setup>
import { defineProps } from "vue";
import PostDetail from "./PostDetail.vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
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
  <div class="">
    <div class="card overflow-hidden hover-img">
      <div class="position-relative">
        <a href="javascript:void(0)">
          <img
            src="@/assets/images/blog/blog-img1.jpg"
            class="card-img-top"
            alt="matdash-img"
          />
        </a>
        <!-- <span
          class="badge text-bg-light text-dark fs-2 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0"
          >2 min Read</span
        > -->
        <img
          src="@/assets/images/profile/user-3.jpg"
          alt="matdash-img"
          class="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
          width="40"
          height="40"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-title="Georgeanna Ramero"
        />
      </div>
      <div class="card-body p-4">
        <!-- <span class="badge text-bg-light fs-2 py-1 px-2 lh-sm mt-3"
          >Social</span
        > -->
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
            <i class="ti ti-point text-dark"></i
            >{{ formatDate(post.createTime) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blur-container {
  position: relative;
  overflow: hidden;
}

.blur {
  filter: blur(10px);
  -webkit-filter: blur(10px); /* Safari 지원 */
  pointer-events: none; /* 클릭 방지 */
}
</style>
