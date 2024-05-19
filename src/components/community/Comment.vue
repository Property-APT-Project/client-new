<script setup>
import { ref, defineProps, onMounted, onUpdated } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

const { VITE_APP_API_MEMBER_UPLOAD } = import.meta.env;
const { VITE_APP_API_COMMENT_LIKE } = import.meta.env;

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

function handleLike() {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);
  axios
    .get(VITE_APP_API_COMMENT_LIKE + "/" + props.comment.id, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      props.comment.like = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

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
console.log(props.comment);
</script>

<template>
  <div>
    <section>
      <div class="container py-1 text-body">
        <div class="row">
          <div class="col-md-11 col-lg-9 col-xl-7 w-100">
            <div class="d-flex flex-start">
              <img
                class="rounded-circle shadow-1-strong me-3"
                :src="`${VITE_APP_API_MEMBER_UPLOAD}/${comment.imgURL}`"
                alt="avatar"
                width="65"
                height="65"
              />
              <div class="card w-100">
                <div class="card-body p-4">
                  <div class="">
                    <h5>{{ comment.name }}</h5>
                    <p class="small">{{ formatDate(comment.createTime) }}</p>
                    <p>
                      {{ comment.content }}
                    </p>

                    <div class="d-flex justify-content-end align-items-center">
                      <div class="d-flex align-items-center">
                        <div @click="handleLike" class="like me-2 icon-link">
                          <i class="fas fa-thumbs-up me-1"></i
                          >{{ comment.like }}
                        </div>
                        <!-- <a href="#!" class="link-muted"
                          ><i class="fas fa-thumbs-down me-1"></i>13</a
                        > -->
                      </div>
                      <!-- <a href="#!" class="link-muted"
                        ><i class="fas fa-reply me-1"></i> Reply</a
                      > -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.like {
  color: #000;
}
.like:hover {
  color: #1266f1;
}

.icon-link {
  cursor: pointer;
}
</style>
