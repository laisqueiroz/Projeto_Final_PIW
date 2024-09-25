<template>
  <div class="modal">
    <h2>Informações do Usuário</h2>
    <p><strong>Nome:</strong> {{ user.name }}</p>
    <p><strong>Sobrenome:</strong> {{ user.lastname }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Papel:</strong> {{ user.role }}</p>
    <button @click="$emit('close')">Fechar</button>
  </div>
</template>

<script lang="ts">
export default {
  props: ["user"],
};
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
