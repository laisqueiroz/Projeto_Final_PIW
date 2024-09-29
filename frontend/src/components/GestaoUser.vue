<template>
  <title>Gestão Usuários</title>
  <h1>Gestão de Usuários</h1>
  <div class="container">
    <div class="buttons-actions">
      <button @click="toGoBack" type="button" class="btn btn-outline-primary">
        Menu Anterior
      </button>
      <button @click="addUser" type="button" class="btn btn-outline-primary">
        Novo Usuário
      </button>
    </div>
    <div class="container mt-5">
      <table class="table table-striped">
        <thead>
          <tr class="table-dark">
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Papel</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ capitalize(user.name) }}</td>
            <td>{{ capitalize(user.lastname) }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <!-- Botões de Ações -->
              <button @click="viewUser(user.id)" class="btn action-btn">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button @click="editUser(user.id)" class="btn action-btn">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button @click="confirmDelete(user.id)" class="btn action-btn">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
}

export default defineComponent({
  setup() {
    const users = ref<User[]>([]);
    const router = useRouter();

    onMounted(async () => {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get("http://localhost:3000/users", config);
        users.value = response.data;
      } catch (error) {
        console.error("Não foi possível listar os usuários: ", error);
      }
    });

    const capitalize = (text: string) => {
      if (!text) return "";
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const addUser = () => {
      router.push("/add-user");
    };

    const toGoBack = () => {
      router.push("/gestao");
    };

    const viewUser = (id: number) => {
      router.push({ name: "UserView", params: { id } });
    };

    const editUser = (id: number) => {
      router.push({ name: "UserEdit", params: { id } });
    };

    const confirmDelete = (id: number) => {
      const confirmed = confirm("Você tem certeza que deseja fazer isso?");
      if (confirmed) {
        deleteUser(id);
      }
    };

    const deleteUser = async (id: number) => {
      const token = localStorage.getItem("token"); // Obtém o token de autorização do localStorage
      if (!token) {
        console.error("Token não encontrado!");
        return;
      }

      try {
        await axios.delete(`http://localhost:3000/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        users.value = users.value.filter((user) => user.id !== id);
        alert("Usuário deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        alert("Erro ao deletar usuário");
      }
    };

    return {
      users,
      confirmDelete,
      deleteUser,
      editUser,
      viewUser,
      addUser,
      capitalize,
      toGoBack,
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
  padding: 5px;
}

.add-user-btn {
  padding: 10px;
  float: right;
  margin-bottom: 20px;
}

.container {
  justify-content: right;
}

.action-btn {
  margin: 5px;
  padding: 8px;
  background-color: #fff;
  color: #70c2d6;
  border-color: #7c7d7e;
  border-radius: 6px;
}

.action-btn:hover {
  background-color: #70c2d6;
  color: #000;
}

table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: #70c2d6;
}
th,
td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.buttons-actions {
  justify-content: space-between;
  display: flex;
}
</style>
