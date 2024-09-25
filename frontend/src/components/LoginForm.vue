<template>
  <head>
    <title>Login e Cadastro</title>
  </head>
  <div class="principal">
    <h1>PetCheck</h1>
    <div class="login-container container" id="login-section">
      <h2>Bem Vindo!!</h2>
      <form @submit.prevent="handleLogin" id="login-form">
        <div>
          <h2>Login</h2>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Digite seu email"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit">Login</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import store from "@/store";

export default defineComponent({
  name: "LoginForm",
  setup() {
    const email = ref<string>("");
    const password = ref<string>("");
    const error = ref<string | null>(null);
    const router = useRouter(); // Para realizar o redirecionamento

    const handleLogin = async () => {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email: email.value,
          password: password.value,
        });

        const token = response.data.token;

        localStorage.setItem("token", token);

        const user = response.data;

        error.value = null;

        store.dispatch("login", user);

        const userRole = store.getters.getUserRole;

        // Redirecionar com base no papel do usuário
        switch (userRole) {
          case "admin":
            router.push("/gestao"); // Redireciona para Gestão
            break;
          case "tutor":
            router.push("/pets"); // Redireciona para página de Pets
            break;
          case "medVet":
            router.push("/listar-pets"); // Redireciona para Listar Pets
            break;
          default:
            error.value = "Papel de usuário desconhecido.";
        }
      } catch (err) {
        error.value = "Erro ao realizar login. Verifique suas credenciais.";
        console.error(err);
      }
    };

    return {
      email,
      password,
      error,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.principal {
  font-family: Arial, sans-serif;
  background-color: #70c2d6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.container {
  width: 300px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
h1 {
  text-align: center;
  font-size: 50px;
  margin-bottom: 60px;
  color: #ffffff;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
input[type="text"],
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0 15px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #21ac77;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
}
button:hover {
  background-color: #2e7055;
}
.login-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
