<template>
  <div class="home-container">
    <div class="left-section">
      <img src="@/assets/pet-image.jpg" alt="Pet Image" class="pet-image" />
      <p>Bem-vindo ao mundo do cuidado animal!</p>
    </div>
    <div class="right-section">
      <h1>Boas-vindas ao PetCheck</h1>
      <p>
        Estamos felizes em tê-lo aqui. Cuide dos seus pets com nosso sistema de
        agendamento online.
      </p>
      <button @click="goToLogin" class="login-button">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomePage",
  setup() {
    const router = useRouter();
    const goToLogin = () => {
      router.push("/login");
    };

    return {
      goToLogin,
    };
  },
});
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
}

.left-section,
.right-section {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.left-section {
  background-color: #f0f8ff;
}

.right-section {
  background-color: #fff8dc;
  text-align: center;
}

.pet-image {
  max-width: 80%;
  border-radius: 10px;
}

.login-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
}

.login-button:hover {
  background-color: #45a049;
}
</style>
