import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "@/data/config.json";
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
  entryFormIsOpen: false,
  api: {}
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

  setApi: (state, { api }) => {
    Vue.set(state, "api", api);
  },

  setTitle: (state, { title }) => {
    state.title = title;
    document.title =
      title === config.siteName ? title : title + " | " + config.siteName;
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
  initialize({ commit }) {
    const initUrl = localStorage.getItem("token")
      ? `${config.init}/${localStorage.getItem("token")}`
      : config.init;
    axios.get(initUrl).then(response => {
      commit("setUser", { user: response.data.user });
      commit("setRoles", { roles: response.data.roles });
      commit("setApi", { api: response.data.api });
    });
  },

  getEntries({ state, commit }) {
    if (state.entries.length > 0) {
      return;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(state.api.getEntries)
        .then(response => {
          commit("setEntries", { entries: response.data.entries });
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  getEntriesByTag({ state, commit }, tag) {
    if (state.entriesByTag[tag]) {
      return;
    }

    axios
      .get(state.api.getEntriesByTag.replace("{tag}", tag))
      .then(response => {
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

    axios.get(state.api.getTags).then(response => {
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
  title: state => state.title,
  user: state => state.user,
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
