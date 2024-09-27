<template>
  <div class="adicionar-pet">
    <h2>Adicionar Pet</h2>
    <form @submit.prevent="adicionarPet">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="pet.name" required />
      </div>
      <div class="form-group">
        <label for="dateBirth">Data de Nascimento:</label>
        <input type="text" id="dateBirth" v-model="pet.dateBirth" required />
      </div>
      <div class="form-group">
        <label for="species">Espécie:</label>
        <input type="text" id="species" v-model="pet.species" required />
      </div>
      <div class="form-group">
        <label for="breed">Raça:</label>
        <input type="text" id="breed" v-model="pet.breed" required />
      </div>
      <button type="submit" @click="adicionarPet">Adicionar Pet</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AdicionarPet",
  setup() {
    const pet = ref({
      name: "",
      dateBirth: "",
      species: "",
      breed: "",
      services: "",
      history: "",
      userId: localStorage.getItem("tutorId"),
    });

    const message = ref("");
    const router = useRouter();

    // Configuração do cabeçalho de autorização com o token
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Função para adicionar um pet
    const adicionarPet = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/pets",
          pet.value,
          axiosConfig
        );
        message.value = "Pet adicionado com sucesso!";
        // Limpa o formulário
        pet.value = {
          name: "",
          dateBirth: "",
          species: "",
          breed: "",
          services: "",
          history: "",
          userId: localStorage.getItem("tutorId"),
        };

        // Redireciona para a página de gestão de pets ou outra página desejada
        router.push("/gestao-tutor");
      } catch (error) {
        console.error("Erro ao adicionar pet", error);
        message.value = "Erro ao adicionar pet.";
      }
    };

    return {
      pet,
      adicionarPet,
      message,
    };
  },
});
</script>

<style scoped>
.adicionar-pet {
  max-width: 400px;
  margin: auto;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  color: green;
  margin-top: 10px;
}
</style>
