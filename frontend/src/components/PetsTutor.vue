<template>
  <title>Home - Tutor</title>
  <h1>Home - Tutor</h1>
  <div>
    <button @click="addPet">Adicionar Pet</button>
  </div>
  <div class="gestao-tutor">
    <!-- Lado Esquerdo: Informações do Tutor -->
    <div class="tutor-info">
      <div class="card tutor-card">
        <h3>{{ tutor.name }} {{ tutor.lastname }}</h3>
        <p>Email: {{ tutor.email }}</p>
        <button @click="editarPerfil">Editar Perfil</button>
      </div>
    </div>

    <!-- Lado Direito: Informações dos Pets -->
    <div class="pets-info">
      <div v-for="pet in pets" :key="pet.petId" class="card pet-card">
        <h4>{{ pet.name }}</h4>
        <p>Data de Nascimento: {{ pet.dateBirth }}</p>
        <p>Espécie: {{ pet.species }}</p>
        <p>Raça: {{ pet.breed }}</p>
        <div class="buttons">
          <button @click="verMais(pet.id)">Ver Mais</button>
          <button @click="adicionarServico(pet.id)">Add Serviço</button>
          <button @click="verHistorico(pet.id)">Histórico</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "GestaoTutor",
  setup() {
    const tutor = ref({
      id: "",
      name: "",
      lastname: "",
      email: "",
      role: "",
    });

    const pets = ref([]);

    const route = useRoute();
    const router = useRouter();

    const token = localStorage.getItem("token");
    const tutorId = route.params.id;

    // Configuração do cabeçalho de autorização com o token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Função para buscar dados do tutor com token de acesso
    const fetchTutor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${tutorId}`,
          config
        );
        tutor.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar dados do tutor", error);
      }
    };

    // Função para buscar dados dos pets com token de acesso
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pets", config);
        pets.value = response.data; // Filtra pets do tutor
      } catch (error) {
        console.error("Erro ao buscar dados dos pets", error);
      }
    };

    // Chamadas iniciais para buscar dados
    onMounted(() => {
      fetchTutor();
      fetchPets();
    });

    // Navegar para página de editar perfil
    const editarPerfil = () => {
      router.push(`/editar-perfil/${tutorId}`);
    };

    // Funções para os botões dos pets
    const verMais = (petId: number) => {
      router.push(`/pet/${petId}`);
    };

    const adicionarServico = (petId: number) => {
      router.push(`/adicionar-servico/${petId}`);
    };

    const verHistorico = (petId: number) => {
      router.push(`/historico/${petId}`);
    };

    const addPet = () => {
      router.push("/add-pet");
    };

    return {
      tutor,
      pets,
      editarPerfil,
      verMais,
      adicionarServico,
      verHistorico,
      addPet,
    };
  },
});
</script>

<style scoped>
.gestao-tutor {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
}

.tutor-info {
  width: 30%;
  padding: 20px;
}

.pets-info {
  width: 70%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
}

.tutor-card {
  max-width: 300px;
}

.pet-card {
  width: 250px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
