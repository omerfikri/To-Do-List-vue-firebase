import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/auth/Login.vue";
import Signup from "@/views/auth/Signup.vue";
import CreateList from "@/views/CreateList.vue";
import { auth } from "@/firebase/config";
import ListDetails from "@/views/ListDetails.vue";

const authEnter = (to, from, next) => {
  let kullanici = auth.currentUser;

  if (!kullanici) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      beforeEnter: authEnter,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/create-list",
      name: "CreateList",
      component: CreateList,
      beforeEnter: authEnter,
    },
    {
      path: "/jobs/:id",
      name: "ListDetails",
      component: ListDetails,
      beforeEnter: authEnter,
      props: true,
    },
  ],
});

export default router;
