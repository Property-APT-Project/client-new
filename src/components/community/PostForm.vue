<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const formData = ref({
  subject: "",
  content: "",
});

function resetForm() {
  formData.value.subject = "";
  formData.value.content = "";
}
const { VITE_APP_API_URL, VITE_APP_LOGIN, VITE_APP_PROFILE } = import.meta.env;
const router = useRouter();
async function sendData() {
  console.log(formData.value);
  await axios
    .post(VITE_APP_LOGIN, formData.value)
    .then((response) => {
      console.log("SUCCESS");
      console.log(response.data);
      // TODO
      router.replace({ name: "community" });
    })
    .catch((error) => {
      console.error("Error:", error);
      router.replace({ name: "community" });
    });
}
</script>

<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">새로운 글</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-body">
              <form>
                <div class="mb-3">
                  <label for="제목" class="form-label">제목</label>
                  <input
                    type="text"
                    v-model="formData.subject"
                    class="form-control"
                    id="subject"
                  />
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">내용</label>
                  <v-md-editor
                    v-model="formData.content"
                    height="400px"
                  ></v-md-editor>
                  <!-- <textarea class="form-control" id="content" /> -->
                </div>

                <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="resetForm"
            type="button"
            class="btn btn-warning"
            data-bs-dismiss="modal"
          >
            닫기
          </button>
          <button
            @click="
              () => {
                sendData();
                resetForm();
              }
            "
            :disabled="!formData.subject || !formData.content"
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
