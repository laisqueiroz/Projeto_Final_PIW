<template>
  <div id="app">
    <h1>Gestão de Usuários</h1>
    <UserForm @userCreated="fetchUsers" />
    <UserList ref="userList" />
  </div>
</template>

<script>
import UserForm from "./components/UserForm.vue";
import UserList from "./components/UserList.vue";

export default {
  components: {
    UserForm,
    UserList,
  },
  methods: {
    fetchUsers() {
      this.$refs.userList.fetchUsers();
    },
  },
};
</script>
