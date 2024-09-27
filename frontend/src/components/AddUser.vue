<template>
  <title>Adicionar Usuário</title>
  <h1>Adicionar Novo Usuário</h1>
  <div class="container mt-5">
    <div class="card p-4">
      <!-- Formulário para adicionar usuário -->
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">Nome:</label>
          <input
            class="form-control"
            type="text"
            id="name"
            v-model="formData.name"
            required
          />
        </div>

        <div class="mb-3">
          <label for="lastname">Sobrenome:</label>
          <input
            class="form-control"
            type="text"
            id="lastname"
            v-model="formData.lastname"
            required
          />
        </div>

        <div class="mb-3">
          <label for="email">Email:</label>
          <input
            class="form-control"
            type="email"
            id="email"
            v-model="formData.email"
            required
          />
          <span v-if="!isEmailValid && submitForm" class="error-message"
            >Formato de email inválido.
          </span>
        </div>

        <div class="mb-3">
          <label for="password">Senha:</label>
          <input
            class="form-control"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="formData.password"
            required
          />
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="togglePasswordVisibility"
          >
            {{ showPassword ? "show password" : "show password" }}
          </button>
        </div>

        <div class="roleSelect">
          <label>Papel:</label>
          <div>
            <input
              class="btn-check"
              autocomplete="off"
              type="radio"
              id="admin"
              value="admin"
              v-model="formData.role"
              required
            />
            <label for="admin" class="btn roleLabel">Administrador</label>
          </div>
          <div>
            <input
              class="btn-check"
              autocomplete="off"
              type="radio"
              id="medVet"
              value="medVet"
              v-model="formData.role"
              required
            />
            <label for="medVet" class="btn roleLabel">Médico Veterinário</label>
          </div>
          <div>
            <input
              class="btn-check"
              autocomplete="off"
              type="radio"
              id="tutor"
              value="tutor"
              v-model="formData.role"
              required
            />
            <label for="tutor" class="btn roleLabel">Tutor</label>
          </div>
        </div>

        <div class="d-flex justify-content-between mt-4">
          <button type="button" class="btn btn-outline-danger" @click="cancel">
            Cancelar
          </button>
          <button type="button" class="btn btn-primary" @click="submitForm">
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AddUser",
  setup() {
    const router = useRouter();

    const showPassword = ref(false);

    const formData = ref({
      name: "",
      lastname: "",
      email: "",
      role: "",
      password: "",
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isEmailValid = computed(() => {
      return emailRegex.test(formData.value.email);
    });

    const isFormValid = computed(() => {
      return (
        formData.value.name !== "" &&
        formData.value.lastname !== "" &&
        isEmailValid &&
        formData.value.role !== "" &&
        formData.value.password !== ""
      );
    });

    const submitForm = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token não encontrado!");
        return;
      }

      try {
        if (isFormValid.value === false) {
          console.error("Todos os campos são obrigatórios!");
        }
        await axios.post("http://localhost:3000/users", formData.value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Usuário criado com sucesso!");
        router.push("/gestaouser");
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        alert("Erro ao criar usuário");
      }
    };

    const cancel = () => {
      router.push("/gestaouser");
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      formData,
      submitForm,
      cancel,
      showPassword,
      togglePasswordVisibility,
      isEmailValid,
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
  margin-top: 30px;
  padding: 5px;
}
.container {
  width: 500px;
  text-align: left;
}
.roleSelect {
  width: 200px;
  display: flex;
}

label {
  display: block;
  margin: 5px;
}
.roleLabel {
  background-color: rgb(241, 241, 241);
}
</style>
