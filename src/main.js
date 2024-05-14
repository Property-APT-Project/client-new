import { useKakao } from "vue3-kakao-maps/@utils";
import { createApp } from "vue";
import { createPinia } from "pinia";

// vue-markdown-editor start //
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import enUS from "@kangc/v-md-editor/lib/lang/en-US";
import koKR from "@kangc/v-md-editor/lib/lang/ko-KR";

import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";

import Prism from "prismjs";

VueMarkdownEditor.lang.use("ko-KR", koKR);
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

// highlightjs
import hljs from "highlight.js";

VMdPreview.use(vuepressTheme, {
  Hljs: hljs,
});

// vue-markdown-editor end //

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
useKakao("5e28e613a6f651bac00ca7d7b68578eb");

app.use(createPinia());
app.use(router);
app.use(VueMarkdownEditor);
app.use(VMdPreview);

app.mount("#app");
