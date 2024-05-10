import { useKakao } from "vue3-kakao-maps/@utils";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
useKakao("5e28e613a6f651bac00ca7d7b68578eb");

app.use(createPinia());
app.use(router);

app.mount("#app");
