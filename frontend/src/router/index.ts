import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import CampaignsView from "@/views/CampaignsView.vue";

const routes = [
  {
    path: "/",
    component: AuthLayout,
    children: [
      { path: "", component: HomeView }, // "/" → Home
      { path: "home", component: HomeView },
      { path: "login", component: LoginView },
      { path: "register", component: RegisterView },
      { path: "campaigns", component: CampaignsView },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
