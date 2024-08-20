<template>
  <div>
    <h2>Criar/Atualizar Usuário</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label>Login:</label>
        <input v-model="login" type="text" required />
      </div>
      <div>
        <label>Senha:</label>
        <input v-model="password" type="password" required />
      </div>
      <div>
        <label>Função:</label>
        <input v-model="role" type="text" required />
      </div>
      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      login: "",
      password: "",
      role: "",
    };
  },
  methods: {
    async submitForm() {
      const newUser = {
        login: this.login,
        password: this.password,
        role: this.role,
      };
      await axios.post("http://localhost:3000/users", newUser);
      this.$emit("userCreated");
    },
  },
};
</script>
