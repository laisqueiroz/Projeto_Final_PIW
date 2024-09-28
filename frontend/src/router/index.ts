import { createRouter, createWebHistory } from "vue-router";
import { getUserRole, isAuthenticated } from "@/service/authService";
import HomePage from "@/components/HomePage.vue";
import Login from "../components/LoginForm.vue";
import Gestao from "../components/GestaoAdmin.vue";
import GestaoUser from "@/components/GestaoUser.vue";
import GestaoService from "@/components/GestaoService.vue";
import Pets from "../components/PetsTutor.vue";
import ListarPets from "../components/ListarPets.vue";
import AddUser from "@/components/AddUser.vue";
import UserView from "@/components/UserView.vue";
import UserEdit from "@/components/UserEdit.vue";
import AddService from "@/components/AddService.vue";
import ViewService from "@/components/ServiceView.vue";
import EditService from "@/components/EditService.vue";
import AddPet from "@/components/AddPet.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/gestao",
    name: "Gestao",
    component: Gestao,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/gestaouser",
    name: "GestaoUser",
    component: GestaoUser,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/gestaoservice",
    name: "GestaoService",
    component: GestaoService,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/pets/:id",
    name: "Pets",
    component: Pets,
    meta: { requiresAuth: true, role: "tutor" },
  },
  {
    path: "/listar-pets",
    name: "ListarPets",
    component: ListarPets,
    meta: { requiresAuth: true, role: "tutor" },
  },
  {
    path: "/add-user",
    name: "AddUser",
    component: AddUser,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/user-view/:id",
    name: "UserView",
    component: UserView,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/user-edit/:id",
    name: "UserEdit",
    component: UserEdit,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/add-service",
    name: "AddService",
    component: AddService,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/service-view/:id",
    name: "ViewService",
    component: ViewService,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/service-edit/:id",
    name: "EditService",
    component: EditService,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/add-pet",
    name: "AddPet",
    component: AddPet,
    meta: { requiresAuth: true, role: "tutor" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const userRole = isAuthenticated() ? getUserRole() : null;

  if (requiresAuth && !isAuthenticated()) {
    next("/login");
  } else if (to.meta.role && userRole !== to.meta.role) {
    alert("Você não tem autorização!");
    next("/login");
  } else {
    next();
  }
});
