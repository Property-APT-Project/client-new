import PostForm from "@/components/community/PostForm.vue";
import MainView from "@/views/MainView.vue";
import CommunityView from "@/views/community/CommunityView.vue";
import PostDetailView from "@/views/PostDetailView.vue";
import FindPasswordView from "@/views/user/FindPasswordView.vue";
import LoginView from "@/views/user/LoginView.vue";
import ProfileView from "@/views/user/ProfileView.vue";
import SignupView from "@/views/user/SignupView.vue";
import { createRouter, createWebHistory } from "vue-router";
import NewPasswordView from "@/views/user/NewPasswordView.vue";
import AptView from "@/views/AptView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: MainView,
    },
    {
      path: "/login",
      name: "loginForm",
      component: LoginView,
    },
    {
      path: "/join",
      name: "signupForm",
      component: SignupView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/pw-service",
      name: "pwService",
      component: FindPasswordView,
    },
    {
      path: "/community",
      name: "community",
      component: CommunityView,
    },
    {
      path: "/post",
      name: "post",
      component: PostDetailView,
    },
    {
      path: "/pw-new",
      name: "newPW",
      component: NewPasswordView,
    },
    {
      path: "/apt",
      name: "apt",
      component: AptView,
    },
    {
      path: "/apt-detail",
      name: "apt-detail",
      component: AptView,
    },
  ],
});

export default router;
