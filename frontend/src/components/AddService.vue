<template>
  <title>Adicionar Serviço/Produto</title>
  <h1>Adicionar Novo Serviço/Produto</h1>
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
          <label for="lastname">Descrição:</label>
          <input
            class="form-control"
            type="text"
            id="lastname"
            v-model="formData.description"
            required
          />
        </div>

        <div class="mb-3">
          <label for="email">Preço:</label>
          <input
            class="form-control"
            type="email"
            id="email"
            v-model="formData.price"
            required
          />
        </div>
        <div class="categorySelect">
          <label>Categoria:</label>
          <div>
            <input
              class="btn-check"
              autocomplete="off"
              type="radio"
              id="cosmetico"
              value="cosmetico"
              v-model="formData.category"
              required
            />
            <label for="cosmetico" class="btn roleLabel">Cosmético</label>
          </div>
          <div>
            <input
              class="btn-check"
              autocomplete="off"
              type="radio"
              id="medicamento"
              value="medicamento"
              v-model="formData.category"
              required
            />
            <label for="medicamento" class="btn roleLabel">Medicamento</label>
          </div>
          <div>
            <input
              class="btn-check"
              autocomplete="off"
              type="radio"
              id="brinquedo"
              value="brinquedo"
              v-model="formData.category"
              required
            />
            <label for="brinquedo" class="btn roleLabel">Brinquedo</label>
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
  name: "AddService",
  setup() {
    const router = useRouter();

    const formData = ref({
      name: "",
      description: "",
      price: "",
      category: "",
    });

    const isFormValid = computed(() => {
      return (
        formData.value.name !== "" &&
        formData.value.description !== "" &&
        formData.value.price !== "" &&
        formData.value.category !== ""
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
        await axios.post("http://localhost:3000/service", formData.value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Serviço/Produto criado com sucesso!");
        router.push("/gestaoservice");
      } catch (error) {
        console.error("Erro ao criar Serviço/Produto:", error);
        alert("Erro ao criar Serviço/Produto!");
      }
    };

    const cancel = () => {
      router.push("/gestaoservice");
    };

    return {
      formData,
      submitForm,
      cancel,
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
  width: 700px;
  text-align: left;
}
.categorySelect {
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
