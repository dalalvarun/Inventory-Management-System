import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

export default createStore({
  state: {
    token: null,
    loggedIn: false,
  },
  mutations: {
    login(state, payload) {
      state.token = payload;
      state.loggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.loggedIn = false;
    },
  },
  actions: {
    login(context, payload) {
      context.commit("login", payload);
    },
    logout(context) {
      context.commit("logout");
    },
    setAxiosHeaders(token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
