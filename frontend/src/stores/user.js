import { defineStore } from 'pinia';
import axios from 'axios';
const API_URL = 'http://localhost:3000/api';
export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
    }),
    actions: {
        async fetchUsers() {
            const response = await axios.get('/api/users');
            this.users = response.data;
        },
        async createUser(user) {
            await axios.post('/api/users', user);
            this.fetchUsers();
        },
        async updateUser(user) {
            await axios.put(`/api/users/${user.id}`, user);
            this.fetchUsers();
        },
        async deleteUser(id) {
            await axios.delete(`/api/users/${id}`);
            this.fetchUsers();
        },
    },
});
//# sourceMappingURL=user.js.map