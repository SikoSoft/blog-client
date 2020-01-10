import Vue from "vue";
import Vuex from "vuex";
import config from "@/data/config.json";

Vue.use(Vuex);

const state = {
  initialized: false,
  config: {},
  title: "",
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
    console.log(state);
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
  initialize({ state, commit }) {
    const initUrl = localStorage.getItem("token")
      ? `${config.init}/${localStorage.getItem("token")}`
      : config.init;

    if (state.initialized) {
      return;
    }

    return fetch(initUrl)
      .then(response => response.json())
      .then(json => {
        console.log("json", json);
        commit("setUser", { user: json.user });
        commit("setRoles", { roles: json.roles });
        commit("setApi", { api: json.api });
      });
  },

  getEntries({ state, commit }, force) {
    if (state.entries.length > 0 && !force) {
      return;
    }

    return new Promise((resolve, reject) => {
      fetch(state.api.getEntries.href, { method: state.api.getEntries.method })
        .then(response => response.json())
        .then(json => {
          commit("setEntries", { entries: json.entries });
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  getEntriesByTag({ state, commit }, tag) {
    if (state.entriesByTag[tag]) {
      return;
    }

    fetch(state.api.getEntriesByTag.replace("{tag}", tag))
      .then(response => response.json())
      .then(json => {
        commit("setEntriesByTag", { tag, entries: json.entries });
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

    fetch(state.api.getTags)
      .then(response => response.json())
      .then(response => {
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
  api: state => state.api,
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
