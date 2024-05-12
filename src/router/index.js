import PostForm from "@/components/community/PostForm.vue";
import FindPassword from "@/components/user/FindPassword.vue";
import Login from "@/components/user/Login.vue";
import Profile from "@/components/user/Profile.vue";
import Signup from "@/components/user/Signup.vue";
import MainView from "@/views/MainView.vue";
import CommunityView from "@/views/CommunityView.vue";
import PostDetailView from "@/views/PostDetailView.vue";
import { createRouter, createWebHistory } from "vue-router";

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
      component: Login,
    },
    {
      path: "/join",
      name: "signupForm",
      component: Signup,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/pw-service",
      name: "pwService",
      component: FindPassword,
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
  ],
});

export default router;
