<template>
  <title>Editar Serviço/Produto</title>
  <h1>Editar Serviço/Produtos</h1>
  <div class="edit-user card p-4">
    <form @submit.prevent="updateUser" class="container mt-5">
      <div class="mb-3">
        <label>ID : {{ service.serviceId }}</label>
      </div>
      <div class="mb-3">
        <label for="name">Nome:</label>
        <input v-model="service.name" id="name" type="text" required />
      </div>
      <div class="mb-3">
        <label for="description">Descrição:</label>
        <input
          v-model="service.description"
          id="description"
          type="text"
          required
        />
      </div>
      <div class="mb-3">
        <label for="category">Categorias:</label>
        <select v-model="service.category" id="category" required>
          <option value="cosmetico">Cosmético</option>
          <option value="medicamento">Medicamento</option>
          <option value="brinquedo">Brinquedo</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="price">Price:</label>
        <input v-model="service.price" id="price" type="text" required />
      </div>
      <div class="buttons-actions">
        <button @click="returnMenu" class="btn btn-outline-primary">
          Menu Anterior
        </button>
        <button type="submit" class="btn btn-outline-primary">Atualizar</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import axios, { AxiosError } from "axios";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const Idservice = route.params.id;

    const service = reactive({
      serviceId: "",
      name: "",
      description: "",
      price: "",
      category: "",
    });

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/service/${Idservice}`
        );
        Object.assign(service, response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          alert("Serviço não encontrado!");
          router.push("/gestaoservice");
        } else {
          console.error("erro ao buscar serviço:", error);
          alert("Algo deu errado!");
        }
      }
    };

    const updateUser = async () => {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        await axios.put(
          `http://localhost:3000/service/${Idservice}`,
          service,
          config
        );
        alert("Serviço atualizado com sucesso!");
        router.push("/gestaoservice");
      } catch (error) {
        console.error("Não foi possível atualizar o serviço: ", error);
        alert("Erro ao atualizar serviço!");
      }
    };

    const returnMenu = () => {
      router.push("/gestaoservice");
    };

    onMounted(fetchUser);

    return {
      service,
      updateUser,
      returnMenu,
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

.edit-user {
  width: 600px;
  margin: 0 auto;
}

form div {
  margin-bottom: 12px;
}

form label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

form input,
form select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.buttons-actions {
  justify-content: space-between;
  display: flex;
}
</style>
