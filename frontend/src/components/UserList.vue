<template>
  <div>
    <h2>Lista de Usuários</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.login }} - {{ user.role }}
        <button @click="deleteUser(user.id)">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      const response = await axios.get("http://localhost:3000/users");
      this.users = response.data;
    },
    async deleteUser(id) {
      await axios.delete(`http://localhost:3000/users/${id}`);
      this.fetchUsers();
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
