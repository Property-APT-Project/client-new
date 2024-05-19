import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";
import AptView from "@/views/AptView.vue";
import AptDetailView from "@/views/AptDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: MainView,
    },
    {
      path: "/apt",
      name: "apt",
      component: AptView,
    },
    {
      path: "/apt-detail",
      name: "apt-detail",
      component: AptDetailView,
      props: route => ({info: route.query.info})
    },
  ],
});


export default router;
