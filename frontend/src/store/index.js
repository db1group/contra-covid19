import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    user: {
      email: '',
      unidadeSaudeNome: '',
      unidadeSaudeId: '',
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser;
    },
  },
  actions: {
    SET_USER(context, newUser) {
      context.commit('setUser', newUser);
    },
  },
});
