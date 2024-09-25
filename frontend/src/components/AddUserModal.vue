<template>
  <div class="modal">
    <h2>Cadastrar Novo Usuário</h2>
    <label>Nome</label>
    <input v-model="newUser.name" type="text" />

    <label>Sobrenome</label>
    <input v-model="newUser.lastname" type="text" />

    <label>Email</label>
    <input v-model="newUser.email" type="email" />

    <label>Papel</label>
    <select v-model="newUser.role">
      <option value="admin">Admin</option>
      <option value="tutor">Tutor</option>
      <option value="medVet">Médico Veterinário</option>
    </select>

    <label>Senha</label>
    <input v-model="newUser.password" type="password" />

    <button @click="confirmAdd">Confirmar</button>
    <button @click="$emit('close')">Cancelar</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(_, { emit }) {
    const newUser = ref({
      name: "",
      lastname: "",
      email: "",
      role: "tutor",
      password: "",
    });

    const confirmAdd = () => {
      emit("addUser", newUser.value);
    };

    return { newUser, confirmAdd };
  },
});
</script>

<style scoped>
.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
