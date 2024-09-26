<template>
  <div class="gestao-admin-container">
    <h1 class="page-title">Painel de Gestão</h1>

    <div class="gestao-admin">
      <div class="gestao-card" @click="goToUserManagement">
        <div class="icon-container">
          <i class="fa-solid fa-users"></i>
        </div>
        <h2>Gestão de Usuários</h2>
        <p>
          Gerencie usuários cadastrados no sistema, atualize suas permissões e
          dados pessoais.
        </p>
      </div>

      <div class="gestao-card" @click="goToServiceManagement">
        <div class="icon-container">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
        <h2>Gestão de Produtos/Serviços</h2>
        <p>
          Adicione ou remova produtos e serviços, e atualize informações
          detalhadas.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GestaoAdmin",
  setup() {
    const router = useRouter();

    const goToUserManagement = () => {
      router.push({ name: "GestaoUser" });
    };

    const goToServiceManagement = () => {
      router.push({ name: "GestaoService" });
    };

    return {
      goToUserManagement,
      goToServiceManagement,
    };
  },
});
</script>

<style scoped>
.gestao-admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 20px;
  background-color: #70c2d6;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #fff;
  text-align: center;
}

.gestao-admin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px; /* Espaço entre os cartões */
}

.gestao-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 500px;
  padding: 20px;
  align-content: space-around;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.gestao-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.icon-container {
  font-size: 100px;
  color: #178aa7;
  margin-bottom: 15px;
}

.gestao-card h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.gestao-card p {
  font-size: 16pt;
  color: #777;
}
</style>
