<template>
  <title>Gestão - Serviços/Produtos</title>
  <h1>Gestão de Serviços/Produtos</h1>
  <div class="container">
    <div class="buttons-actions">
      <button @click="toGoBack" type="button" class="btn btn-outline-primary">
        Menu Anterior
      </button>
      <button @click="addService" type="button" class="btn btn-outline-primary">
        + Serviço/Produto
      </button>
    </div>
    <div class="container mt-5">
      <table class="table table-striped">
        <thead>
          <tr class="table-dark">
            <th>Id</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services" :key="service.serviceId">
            <td>{{ service.serviceId }}</td>
            <td>{{ capitalize(service.name) }}</td>
            <td>{{ service.price }}</td>
            <td>{{ capitalize(service.category) }}</td>
            <td>
              <!-- Botões de Ações -->
              <button
                @click="viewService(service.serviceId)"
                class="btn action-btn"
              >
                <i class="fa-solid fa-eye"></i>
              </button>
              <button
                @click="editService(service.serviceId)"
                class="btn action-btn"
              >
                <i class="fa-solid fa-pen"></i>
              </button>
              <button
                @click="confirmDelete(service.serviceId)"
                class="btn action-btn"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

interface Service {
  serviceId: number;
  name: string;
  description: string;
  price: string;
  category: string;
}

export default defineComponent({
  setup() {
    const services = ref<Service[]>([]);
    const router = useRouter();

    onMounted(async () => {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://localhost:3000/service",
          config
        );
        services.value = response.data;
      } catch (error) {
        console.error("Não foi possível listar os serviços/produtos: ", error);
      }
    });

    const capitalize = (text: string) => {
      if (!text) return "";
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const addService = () => {
      router.push("/add-service");
    };

    const toGoBack = () => {
      router.push("/gestao");
    };

    const viewService = (id: number) => {
      router.push({ name: "ViewService", params: { id } });
    };

    const editService = (id: number) => {
      router.push({ name: "EditService", params: { id } });
    };

    const confirmDelete = (id: number) => {
      const confirmed = confirm("Você tem certeza que deseja fazer isso?");
      if (confirmed) {
        deleteUser(id);
      }
    };

    const deleteUser = async (id: number) => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado!");
        return;
      }

      try {
        await axios.delete(`http://localhost:3000/service/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        services.value = services.value.filter(
          (service) => service.serviceId !== id
        );
        alert("Serviço/Produto deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar Serviço/Produto:", error);
        alert("Erro ao deletar Serviço/Produto!");
      }
    };

    return {
      services,
      confirmDelete,
      deleteUser,
      editService,
      viewService,
      addService,
      capitalize,
      toGoBack,
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
  padding: 5px;
}

.add-user-btn {
  padding: 10px;
  float: right;
  margin-bottom: 20px;
}

.container {
  justify-content: right;
}

.action-btn {
  margin: 5px;
  padding: 8px;
  background-color: #fff;
  color: #70c2d6;
  border-color: #7c7d7e;
  border-radius: 6px;
}

.action-btn:hover {
  background-color: #70c2d6;
  color: #000;
}

table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: #70c2d6;
}
th,
td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.buttons-actions {
  justify-content: space-between;
  display: flex;
}
</style>
