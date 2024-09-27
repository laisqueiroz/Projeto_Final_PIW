import { createStore } from "vuex";

interface User {
  id: number;
  name: string;
  role: "admin" | "tutor" | "medVet";
}

interface State {
  user: User | null;
}

const store = createStore<State>({
  state: {
    user: null,
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
    getUserId: (state) => {
      return state.user ? state.user.id : null;
    },
  },
});

export default store;
