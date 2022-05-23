import Vue from "vue";
import Vuex from "vuex";
import state from "./initialState";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
