import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import PostDetail from "../Views/PostDetail.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/post/:id", component: PostDetail },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;