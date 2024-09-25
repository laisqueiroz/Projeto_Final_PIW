import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import Login from "../components/LoginForm.vue"; 
import Gestao from "../components/GestaoAdmin.vue"; 
import GestaoUser from "@/components/GestaoUser.vue";
import GestaoService from "@/components/GestaoService.vue";
import Pets from "../components/PetsTutor.vue"; 
import ListarPets from "../components/ListarPets.vue"; 

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: Login },
  { path: "/gestao", name: "Gestao", component: Gestao }, 
  { path: "/gestaouser", name: "GestaoUser", component: GestaoUser },
  { path: "/gestaoservice", name: "GestaoService", component: GestaoService },
  { path: "/pets", name: "Pets", component: Pets }, 
  { path: "/listar-pets", name: "ListarPets", component: ListarPets },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
