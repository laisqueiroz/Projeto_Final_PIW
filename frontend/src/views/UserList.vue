<template>
  <div>
    <h1>Lista de Usuários</h1>
    <router-link to="/users/new">Novo Usuário</router-link>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.login }} - {{ user.role }}
        <router-link :to="{ name: 'EditUser', params: { id: user.id }}">Editar</router-link>
        <button @click="deleteUser(user.id)">Deletar</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useUserStore } from '../stores/user';

export default defineComponent({
  setup() {
    const userStore = useUserStore();

    onMounted(() => {
      userStore.fetchUsers();
    });

    return {
      users: userStore.users,
      deleteUser: userStore.deleteUser,
    };
  },
});
</script>
