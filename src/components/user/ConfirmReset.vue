<template>
  <div class="container">
    <div class="content">
      <h2 v-if="success">인증 확인</h2>
      <h2 v-else>인증 실패</h2>
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const message = ref("인증 중...");
const success = ref(true);

const { VITE_APP_API_RESET_PASSWORD_VALIDATE_TOKEN } = import.meta.env;
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  axios
    .get(VITE_APP_API_RESET_PASSWORD_VALIDATE_TOKEN, { params: { token } })
    .then(() => {
      message.value = "확인되었습니다. 원래 브라우저로 돌아가주세요";
      localStorage.setItem("resetToken", token); // 토큰을 로컬 스토리지에 저장
      success.value = true;
    })
    .catch((error) => {
      // message.value = "Error: " + error.response.data;
      message.value = "유효하지 않은 인증입니다";
      success.value = false;
    });
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Viewport height: 전체 화면 높이 */
  text-align: center;
}

.content {
  max-width: 500px;
}
</style>
