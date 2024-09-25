<template>
  <h1>Gestão de Usuários</h1>
  <div class="container">
    <div class="button-cadastro">
      <button @click="openAddUserPopup" class="btn btn-success add-user-btn">
        Novo Usuário
      </button>
    </div>
    <div class="container mt-5">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>Papel</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <!-- Botões de Ações -->
              <button @click="viewUser(user)" class="action-btn">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button @click="editUser(user)" class="action-btn">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button @click="confirmDeleteUser(user.id)" class="action-btn">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <UserModal
      v-if="selectedUser"
      :user="selectedUser"
      @close="closeViewUser"
    />

    <AddUserModal
      v-if="isAddUserPopupOpen"
      @close="closeAddUserPopup"
      @addUser="addUser"
    />

    <DeleteConfirmation
      v-if="isDeletePopupOpen"
      @confirm="deleteUser"
      @cancel="closeDeletePopup"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import UserModal from "./UserModal.vue";
import AddUserModal from "./AddUserModal.vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: string;
}

export default defineComponent({
  components: { UserModal, AddUserModal, DeleteConfirmation },
  setup() {
    const users = ref<User[]>([]);
    const selectedUser = ref<User | null>(null);
    const isAddUserPopupOpen = ref(false);
    const isDeletePopupOpen = ref(false);
    const userIdToDelete = ref<number | null>(null);

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
        console.error("Error fetching users:", error);
      }
    });

    const viewUser = (user: User) => {
      selectedUser.value = user;
    };

    const closeViewUser = () => {
      selectedUser.value = null;
    };

    const editUser = (user: User) => {
      window.location.href = `/editar-usuario/${user.id}`;
    };

    const openAddUserPopup = () => {
      isAddUserPopupOpen.value = true;
    };

    const closeAddUserPopup = () => {
      isAddUserPopupOpen.value = false;
    };

    const addUser = async (newUser: User) => {
      const token = localStorage.getItem("token"); 

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };

      await axios.post("http://localhost:3000/users", newUser, config); 
      users.value.push(newUser);
      closeAddUserPopup();
    };

    const confirmDeleteUser = (id: number) => {
      userIdToDelete.value = id;
      isDeletePopupOpen.value = true;
    };

    const deleteUser = async () => {
      const token = localStorage.getItem("token"); 

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };

      await axios.delete(
        `http://localhost:3000/users/${userIdToDelete.value}`,
        config
      ); 
      users.value = users.value.filter(
        (user) => user.id !== userIdToDelete.value
      );
      closeDeletePopup();
    };

    const closeDeletePopup = () => {
      isDeletePopupOpen.value = false;
    };

    return {
      users,
      selectedUser,
      viewUser,
      closeViewUser,
      editUser,
      isAddUserPopupOpen,
      openAddUserPopup,
      closeAddUserPopup,
      addUser,
      isDeletePopupOpen,
      confirmDeleteUser,
      deleteUser,
      closeDeletePopup,
    };
  },
});
</script>

<style scoped>
h1 {
  margin: 10px;
  padding: 5px;
}

.add-user-btn {
  background-color: #70c2d6;
  border: none;
  padding: 10px;
  float: right;
  margin-bottom: 20px;
}

.add-user-btn {
  background-color: #70c2d6;
  border: none;
  padding: 10px;
  float: right;
  margin-bottom: 20px;
}

.add-user-btn:hover {
  background-color: #3b9bb3;
}

.container {
  justify-content: right;
}

.action-btn {
  margin: 5px;
  padding: 8px;
  background-color: #fff;
  color: #70c2d6;
  border-color: #004152;
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
th,
td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
</style>
