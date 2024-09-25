<template>
  <div class="home-container">
    <div class="left-section">
      <img src="@/assets/pet-image.jpg" alt="Pet Image" class="pet-image" />
      <p>Bem-vindo ao mundo do cuidado animal!</p>
    </div>
    <div class="right-section">
      <h1>Boas-vindas ao PetCheck</h1>
      <p>Estamos felizes em tê-lo aqui. Seu pet sempre em boas mãos.</p>
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

p {
  width: 50%;
  font-size: 20pt;
  font-family: Arial, Helvetica, sans-serif;
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
  background-color: #e2e2e2;
}

.right-section {
  background-color: #70c2d6;
  text-align: center;
}

.pet-image {
  max-width: 80%;
  border-radius: 10px;
}

.login-button {
  background-color: #fff;
  color: rgb(0, 0, 0);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
}

.login-button:hover {
  background-color: #5f5e5e;
  color: #fff;
}
</style>
