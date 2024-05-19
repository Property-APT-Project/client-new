<script setup>
import { ref, defineProps, onMounted, watch } from "vue";
import Comment from "./Comment.vue";
import axios from "axios";
import Cookies from "js-cookie";

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
});

const postDetail = ref({
  id: "",
  userId: "",
  name: "",
  profileImgURL: "",
  title: "",
  content: "",
  like: "",
  hit: "",
  createTime: "",
  comments: "[]",
});

const newComment = ref(""); // 새로운 댓글 내용
const {
  VITE_APP_API_POST,
  VITE_APP_API_POST_LIKE,
  VITE_APP_API_MEMBER_UPLOAD,
  VITE_APP_API_NEW_COMMENT,
} = import.meta.env;

console.log(VITE_APP_API_POST + "/" + props.postId.value);
onMounted(() => {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);
  axios
    .get(VITE_APP_API_POST + "/" + props.postId, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      postDetail.value = response.data;
      console.log(postDetail.value);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
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

function handleLike() {
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);
  axios
    .get(VITE_APP_API_POST_LIKE + "/" + postDetail.value.id, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      postDetail.value.like = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

// postDetail이 업데이트될 때 commentData 설정
watch(postDetail, (newValue) => {
  commentData.value.userId = newValue.userId;
  commentData.value.postId = newValue.id;
});

const commentData = ref({
  userId: postDetail.value.userId,
  postId: postDetail.value.postId,
  content: "",
});

// 댓글 제출 핸들러
const handleCommentSubmit = () => {
  console.log(commentData.value);
  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);
  axios
    .post(VITE_APP_API_NEW_COMMENT, commentData.value, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      postDetail.value.comments.push(response.data);
      commentData.value.content = ""; // 입력 필드 초기화
    })
    .catch((error) => {
      console.error("Error submitting comment:", error);
    });
};
</script>

<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card mb-5">
            <div class="card-header">
              <h1 class="text-center display-1">{{ postDetail.title }}</h1>
              <hr />
              <div class="d-flex align-items-center">
                <img
                  class="rounded-circle shadow-1-strong me-3"
                  :src="`${VITE_APP_API_MEMBER_UPLOAD}/${postDetail.profileImgURL}`"
                  alt="avatar"
                  width="70"
                  height="70"
                />
                <div>
                  <span class="fw-bold">{{ postDetail.name }}</span>
                  <br />
                  <span class="text-muted">{{
                    formatDate(postDetail.createTime)
                  }}</span>
                </div>
              </div>
            </div>
            <div class="card-body">
              <v-md-preview :text="postDetail.content"></v-md-preview>
            </div>
            <div class="card-footer d-flex justify-content-end gap-3">
              <div>
                <div class="like text-black">
                  <i class="ti ti-eye text-dark me-1"></i>{{ postDetail.hit }}
                </div>
              </div>
              <div class="text-black">
                <i class="ti ms-n1 ti-message-2 text-dark fs-5"></i>
                {{ postDetail.comments.length }}
              </div>
              <div>
                <div @click="handleLike" class="like me-2 clickable">
                  <i class="fas fa-thumbs-up me-1"></i>{{ postDetail.like }}
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <h2>댓글</h2>
            <hr />
          </div>

          <div class="comment-form-card bg-transparent mb-5">
            <div class="card-body">
              <h3>작성하기</h3>
              <form @submit.prevent="handleCommentSubmit">
                <div class="mb-3">
                  <textarea
                    v-model="commentData.content"
                    class="form-control bg-white"
                    placeholder="댓글을 여기에 작성하세요..."
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-primary">등록</button>
                </div>
              </form>
            </div>
          </div>
          <Comment
            v-for="comment in postDetail.comments"
            :comment="comment"
            :key="comment.id"
          />
        </div>
      </div>
    </div>

    <!-- <h1>hi</h1> -->
  </div>
</template>

<style scoped>
.profile-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-date {
  margin-left: 10px;
  color: gray;
}

.post-img {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}

.comment-date {
  display: block;
  color: gray;
  font-size: 0.9em;
}

.no-bg {
  background-color: transparent;
}

.like {
  color: #000;
}

.like:hover {
  color: #1266f1;
}

.clickable {
  cursor: pointer;
}

.comment-form-card {
  border: 1px solid #dee2e6; /* 경계선 추가 */
  margin-top: 20px; /* 상단 여백 추가 */
  padding: 20px; /* 내부 여백 추가 */
  border-radius: 8px; /* 모서리를 둥글게 설정 */
}
</style>
