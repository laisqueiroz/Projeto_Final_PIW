<template>
  <title>Editar Usuário</title>
  <h1>Edit User</h1>
  <div class="edit-user card p-4">
    <form @submit.prevent="updateUser" class="container mt-5">
      <div class="mb-3">
        <label for="name">First Name:</label>
        <input v-model="user.name" id="name" type="text" required />
      </div>
      <div class="mb-3">
        <label for="lastname">Last Name:</label>
        <input v-model="user.lastname" id="lastname" type="text" required />
      </div>
      <div class="mb-3">
        <label for="email">Email:</label>
        <input v-model="user.email" id="email" type="email" required />
      </div>
      <div class="mb-3">
        <label for="role">Role:</label>
        <select v-model="user.role" id="role" required>
          <option value="admin">Admin</option>
          <option value="medVet">Veterinarian</option>
          <option value="tutor">Tutor</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="password">Password:</label>
        <input v-model="user.password" id="password" type="password" required />
      </div>
      <div class="buttons-actions">
        <button @click="returnMenu" class="btn btn-outline-primary">
          Menu Anterior
        </button>
        <button type="submit" class="btn btn-outline-primary">Atualizar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import axios from "axios";
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
        console.error("Error fetching user:", error);
      }
    };

    const updateUser = async () => {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        await axios.put(`http://localhost:3000/users/${userId}`, user, config);
        alert("Usuário atualizado com sucesso!");
        router.push("/gestaouser");
      } catch (error) {
        console.error("Não foi possível atualizar o usuário: ", error);
        alert("Erro ao atualizar usuário!");
      }
    };

    const returnMenu = () => {
      router.push("/gestaouser");
    };

    onMounted(fetchUser);

    return {
      user,
      updateUser,
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

.container {
  width: 500px;
  text-align: left;
}

.edit-user {
  width: 600px;
  margin: 0 auto;
}

form div {
  margin-bottom: 12px;
}

form label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

form input,
form select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}

button {
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
