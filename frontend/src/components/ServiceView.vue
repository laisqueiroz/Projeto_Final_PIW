<template>
  <title>Informações - Serviço/Produto</title>
  <h1>Informações do Serviço/Produuto</h1>
  <div class="principal card p-4">
    <div class="view-user">
      <div v-if="service" class="container mt-5 card p-4">
        <p class="mb-3"><strong>ID:</strong> {{ service.serviceId }}</p>
        <p class="mb-3"><strong>Nome:</strong> {{ service.name }}</p>
        <p class="mb-3">
          <strong>Descrição:</strong> {{ service.description }}
        </p>
        <p class="mb-3"><strong>Preço:</strong> {{ service.price }}</p>
        <p class="mb-3"><strong>Categoria:</strong> {{ service.category }}</p>
      </div>
      <div v-else>
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div class="buttons-actions">
      <button @click="returnMenu" class="btn btn-outline-primary">
        Cancelar
      </button>
      <button @click="goToEditUser" class="btn btn-outline-primary">
        Editar Serviço
      </button>
    </div>
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
    const serviceId = route.params.id;

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
          `http://localhost:3000/service/${serviceId}`
        );
        Object.assign(service, response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          alert("Serviço não encontrado!");
          router.push("/gestaoservice");
        } else {
          console.error("Aconteceu algum erro:", error);
          alert("Algo deu errado!");
        }
      }
    };

    const goToEditUser = () => {
      router.push(`/service-edit/${serviceId}`);
    };

    const returnMenu = () => {
      router.push("/gestaoservice");
    };

    onMounted(fetchUser);

    return {
      service,
      goToEditUser,
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

.card {
  width: 550px;
  justify-content: center;
  margin: auto;
}

.container {
  width: 500px;
  text-align: left;
}

p {
  font-size: 18px;
}

button {
  margin-top: 20px;
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
