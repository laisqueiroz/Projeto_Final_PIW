import { createStore } from "vuex";
const store = createStore({
  state: {
    user: null, // Estado inicial do usuário
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, user) {
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
//# sourceMappingURL=index.js.map
