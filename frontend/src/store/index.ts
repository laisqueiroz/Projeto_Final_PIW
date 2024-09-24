import { createStore } from "vuex";

// Defina o tipo do estado
interface User {
  id: number;
  name: string;
  role: "admin" | "tutor" | "medVet"; // Defina os papéis permitidos
}

interface State {
  user: User | null;
}

const store = createStore<State>({
  state: {
    user: null, // Estado inicial do usuário
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, user: User) {
      commit("setUser", user);
    },
  },
  getters: {
    getUserRole: (state) => {
      return state.user ? state.user.role : null;
    },
  },
});

export default store;
