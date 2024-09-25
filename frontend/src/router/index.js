import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import Login from "../components/LoginForm.vue"; // Componente de login
import Gestao from "../components/GestaoAdmin.vue"; // Componente de Gestão (admin)
import GestaoUser from "@/components/GestaoUser.vue";
import GestaoService from "@/components/GestaoService.vue";
import Pets from "../components/PetsTutor.vue"; // Componente para Tutor listar/criar pets
import ListarPets from "../components/ListarPets.vue"; // Componente para Veterinário listar pets
const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/login", name: "Login", component: Login },
  { path: "/gestao", name: "Gestao", component: Gestao },
  { path: "/gestaouser", name: "GestaoUsers", component: GestaoUser },
  { path: "/gestaoservice", name: "GestaoService", component: GestaoService },
  { path: "/pets", name: "Pets", component: Pets },
  { path: "/listar-pets", name: "ListarPets", component: ListarPets }, // Rota de Listar Pets para Médico Veterinário
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
//# sourceMappingURL=index.js.map
