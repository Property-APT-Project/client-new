<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { usePostStore } from "@/stores/post";

const formData = ref({
  imgURL: "",
  title: "",
  content: "",
});

const postStore = usePostStore();

function resetForm() {
  formData.value.title = "";
  formData.value.content = "";
}
const { VITE_APP_API_NEW_POST, VITE_APP_API_POST_UPLOAD } = import.meta.env;
const router = useRouter();

const handleSubmit = async () => {
  const form = new FormData();
  form.append("file", file.value);

  console.log("file" + file.value);
  await axios
    .post(VITE_APP_API_POST_UPLOAD, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      formData.value.imgURL = response.data;
      console.log("Image uploaded successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  postStore
    .addPost(formData.value)
    .then(
      Swal.fire({
        // title: "",
        text: "등록되었습니다.",
        icon: "success",
      })
    )
    .then(resetForm)
    .catch((error) => {
      console.error("Error submitting post:", error);
    });
};

async function sendData() {
  const form = new FormData();
  form.append("file", file.value);

  console.log("file" + file.value);
  await axios
    .post(VITE_APP_API_POST_UPLOAD, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      formData.value.imgURL = response.data;
      console.log("Image uploaded successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const tokenCookie = Cookies.get("authToken");
  const token = JSON.parse(tokenCookie);
  await axios
    .post(VITE_APP_API_NEW_POST, formData.value, {
      headers: {
        Authorization: "Bearer " + token.accessToken,
      },
    })
    .then((response) => {
      console.log("SUCCESS");
      console.log(response.data);
      emit("post-added", response.data);
      Swal.fire({
        // title: "",
        text: "등록되었습니다.",
        icon: "success",
      }).then(() => {});
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const file = ref("");
async function uploadImage(event) {
  const files = event.target?.files;
  file.value = files[0];
  await base64(file.value);
}
function base64(file) {
  return new Promise((resolve) => {
    let a = new FileReader();
    a.onload = (e) => {
      resolve(e.target.result);
      const previewImage = document.getElementById("profileImage");
      previewImage.src = e.target.result;
    };

    a.readAsDataURL(file);
  });
}

// function handleSubmit() {
//   sendData();
//   resetForm();
// }
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
                    v-model="formData.title"
                    class="form-control"
                    id="title"
                  />
                </div>
                <div class="row">
                  <div class="col d-flex justify-content-center">
                    <img
                      src="@/assets/images/blog/blog-img1.jpg"
                      id="profileImage"
                      class="card-img img-thumbnail"
                      alt="..."
                    />
                  </div>
                  <div class="d-flex mt-2 justify-content-center">
                    <label class="btn btn-light text-primary text-nowrap">
                      썸네일 등록
                      <input
                        hidden
                        ref="image"
                        id="profileImageInput"
                        type="file"
                        name="image"
                        accept="image/*"
                        multiple="multiple"
                        @change="uploadImage"
                      />
                    </label>
                  </div>
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
            @click="handleSubmit"
            :disabled="!formData.title || !formData.content"
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
