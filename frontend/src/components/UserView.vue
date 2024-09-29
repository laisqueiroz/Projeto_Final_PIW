<template>
  <title>Informações - Usuário</title>
  <h1>Informações do Usuário</h1>
  <div class="principal card p-4">
    <div class="view-user">
      <div v-if="user" class="container mt-5 card p-4">
        <p class="mb-3"><strong>ID:</strong> {{ user.id }}</p>
        <p class="mb-3"><strong>First Name:</strong> {{ user.name }}</p>
        <p class="mb-3"><strong>Last Name:</strong> {{ user.lastname }}</p>
        <p class="mb-3"><strong>Email:</strong> {{ user.email }}</p>
        <p class="mb-3"><strong>Role:</strong> {{ user.role }}</p>
        <p class="mb-3"><strong>Password:</strong> {{ user.password }}</p>
      </div>
      <div v-else>
        <p>Loading user information...</p>
      </div>
    </div>
    <div class="buttons-actions">
      <button @click="returnMenu" class="btn btn-outline-primary">
        Cancelar
      </button>
      <button @click="goToEditUser" class="btn btn-outline-primary">
        Editar Usuário
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import axios, { AxiosError } from "axios";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userId = route.params.id;

    const user = reactive({
      id: "",
      name: "",
      lastname: "",
      email: "",
      role: "",
      password: "",
    });

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        Object.assign(user, response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          alert("Usuário não encontrado!");
          router.push("/gestaouser");
        } else {
          console.error("erro ao buscar usuário:", error);
          alert("Algo deu errado!");
        }
      }
    };

    const goToEditUser = () => {
      router.push(`/user-edit/${userId}`);
    };

    const returnMenu = () => {
      router.push("/gestaouser");
    };

    onMounted(fetchUser);

    return {
      user,
      goToEditUser,
      returnMenu,
    };
  },
});
</script>

<style scoped>
h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: #70c2d6;
  margin: 10px;
  margin-top: 30px;
  padding: 5px;
}

.card {
  width: 550px;
  justify-content: center;
  margin: auto;
}

.container {
  width: 500px;
  text-align: left;
}

p {
  font-size: 18px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.buttons-actions {
  justify-content: space-between;
  display: flex;
}
</style>
