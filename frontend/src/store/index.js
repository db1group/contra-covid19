import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export default new Store({
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
      state.name = newUser;
    },
  },
  actions: {
    SET_USER(context, newUser) {
      context.commit('setUser', newUser);
    },
  },
});
