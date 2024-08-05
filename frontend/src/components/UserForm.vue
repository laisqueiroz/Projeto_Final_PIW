<template>
    <div>
      <h1>{{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="login">Login:</label>
          <input type="text" v-model="user.login" id="login" required />
        </div>
        <div>
          <label for="password">Senha:</label>
          <input type="password" v-model="user.password" id="password" required />
        </div>
        <div>
          <label for="role">Papel:</label>
          <select v-model="user.role" id="role" required>
            <option value="admin">Administrador</option>
            <option value="medVet">Médico Veterinário</option>
            <option value="funcionario">Funcionário</option>
            <option value="unregisteredUser">Usuário Não Logado</option>
          </select>
        </div>
        <button type="submit">{{ isEditing ? 'Atualizar' : 'Criar' }}</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useUserStore } from '../stores/user';
  
  export default defineComponent({
    setup() {
      const userStore = useUserStore();
      const router = useRouter();
      const route = useRoute();
  
      const isEditing = ref(false);
      const user = ref({
        id: null,
        login: '',
        password: '',
        role: 'unregisteredUser'
      });
  
      onMounted(() => {
        if (route.params.id) {
          isEditing.value = true;
          const existingUser = userStore.users.find(u => u.id === parseInt(route.params.id as string));
          if (existingUser) {
            user.value = { ...existingUser };
          }
        }
      });
  
      const submitForm = () => {
        if (isEditing.value) {
          userStore.updateUser(user.value.id, user.value);
        } else {
          userStore.createUser(user.value);
        }
        router.push('/users');
      };
  
      return {
        isEditing,
        user,
        submitForm,
      };
    },
  });
  </script>
  