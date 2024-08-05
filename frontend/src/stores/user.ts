import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

interface User {
  id: number;
  login: string;
  role: string;
  password: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    async fetchUsers() {
      const response = await axios.get('/api/users');
      this.users = response.data;
    },
    async createUser(user: User) {
      await axios.post('/api/users', user);
      this.fetchUsers();
    },
    async updateUser(user: User) {
      await axios.put(`/api/users/${user.id}`, user);
      this.fetchUsers();
    },
    async deleteUser(id: number) {
      await axios.delete(`/api/users/${id}`);
      this.fetchUsers();
    },
  },
});
