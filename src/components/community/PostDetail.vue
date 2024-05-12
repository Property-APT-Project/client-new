<script setup>
import { ref } from "vue";
const formData = ref({
  subject: "",
  content: `# Markdown으로 이미지 추가하기

이 글은 Markdown 문법을 사용하여 이미지를 추가하는 예시입니다.

## 방법 1: 인라인 이미지

인라인 이미지를 추가하는 방법은 다음과 같습니다:

![랜덤 고양이](https://cataas.com/cat/gif)

이미지 위에는 대체 텍스트가 있습니다. 대체 텍스트는 이미지를 설명하는 텍스트이며, 이미지를 불러오지 못할 때 대체해서 보여줍니다.

## 방법 2: 참조 이미지

참조 이미지를 추가하는 방법은 다음과 같습니다:

![대체 텍스트][logo]

![랜덤 고양이](https://cataas.com/cat) "이미지 타이틀"

이미지 타이틀은 선택적으로 지정할 수 있습니다. 이미지 타이틀은 마우스를 이미지 위에 올렸을 때 나타나는 툴팁입니다.
`,
});
const text = ref("");
</script>

<template>
  <div>
    <v-md-preview :text="formData.content"></v-md-preview>
    <!-- <h1>hi</h1> -->
  </div>
</template>

<style scoped></style>
