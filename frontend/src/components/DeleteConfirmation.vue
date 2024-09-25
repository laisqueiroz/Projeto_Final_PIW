<template>
  <div class="modal">
    <p>Tem certeza que deseja excluir este usuário?</p>
    <button @click="$emit('confirm')">Sim</button>
    <button @click="$emit('cancel')">Não</button>
  </div>
</template>

<script>
export default {};
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
