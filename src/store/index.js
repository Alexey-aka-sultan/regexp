import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    text: ""
  },
  mutations: {
    text(state, payload) {
      state.text = payload;
    }
  },
  getters: {
    text(state) {
      return state.text;
    }
  }
});
