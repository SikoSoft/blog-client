import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import "./mock.js";

Vue.use(Vuex);

const state = {
  config: {},
  title: "Title",
  breadcrumbs: [],
  user: {},
  roles: [],
  entries: [],
  entriesByTag: {},
  tags: [],
  adminPaneIsOpen: false,
  entryFormIsOpen: false
};

const mutations = {
  setEntries: (state, { entries }) => {
    Vue.set(state, "entries", entries);
  },

  setEntriesByTag: (state, { tag, entries }) => {
    Vue.set(state.entriesByTag, tag, entries);
  },

  setUser: (state, { user }) => {
    Vue.set(state, "user", user);
  },

  setRoles: (state, { roles }) => {
    Vue.set(state, "roles", roles);
  },

  setTitle: (state, { title }) => {
    state.title = title;
  },

  setBreadcrumbs: (state, { breadcrumbs }) => {
    state.breadcrumbs = breadcrumbs;
  },

  setTags: (state, { tags }) => {
    Vue.set(state, "tags", tags);
  },

  setAdminPaneVisibility: (state, { visibility }) => {
    state.adminPaneIsOpen = visibility;
  },

  setEntryFormVisibility: (state, { visibility }) => {
    state.entryFormIsOpen = visibility;
  }
};

const actions = {
  initialize({ dispatch }) {
    dispatch("getUser");
    dispatch("getRoles");
  },

  getUser({ state, commit }) {
    if (state.user.role) {
      return;
    }

    axios.get("/user").then(response => {
      commit("setUser", { user: response.data });
    });
  },

  getRoles({ state, commit }) {
    if (state.roles.length > 0) {
      return;
    }

    axios.get("/roles").then(response => {
      commit("setRoles", { roles: response.data.roles });
    });
  },

  getEntries({ state, commit }) {
    if (state.entries.length > 0) {
      return;
    }

    axios.get("/entries").then(response => {
      commit("setEntries", { entries: response.data.entries });
    });
  },

  getEntriesByTag({ state, commit }, tag) {
    if (state.entriesByTag[tag]) {
      return;
    }

    axios.get(`/tag/${tag}`).then(response => {
      commit("setEntriesByTag", { tag, entries: response.data.entries });
    });
  },

  setTitle({ commit }, title) {
    commit("setTitle", { title });
  },

  setBreadcrumbs({ commit }, breadcrumbs) {
    commit("setBreadcrumbs", { breadcrumbs });
  },

  getTags({ state, commit }) {
    if (state.tags.length > 0) {
      return;
    }

    axios.get("/tags").then(response => {
      commit("setTags", { tags: response.data.tags });
    });
  },

  showAdminPane({ commit }) {
    commit("setAdminPaneVisibility", { visibility: true });
  },

  showEntryForm({ commit }) {
    commit("setEntryFormVisibility", { visibility: true });
  },

  hideEntryForm({ commit }) {
    commit("setEntryFormVisibility", { visibility: false });
  }
};

const getters = {
  entries: state => state.entries,
  entriesByTag: state => state.entriesByTag,
  entryById: state => id => {
    return state.entries.filter(entry => entry.id === id)[0];
  },
  breadcrumbs: state => state.breadcrumbs,
  tags: state => state.tags,
  entryFormIsOpen: state => state.entryFormIsOpen
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
