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
  api: {},
  token: ""
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

  setToken: (state, { token }) => {
    state.token = token;
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
  initialize({ state, commit, getters }) {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (token) {
      commit("setToken", { token });
    }

    if (state.initialized) {
      return;
    }

    return fetch(config.init, { headers: getters.headers })
      .then(response => response.json())
      .then(json => {
        commit("setUser", { user: json.user });
        commit("setRoles", { roles: json.roles });
        commit("setApi", { api: json.api });
      });
  },

  getEntries({ state, commit, getters }, force) {
    if (state.entries.length > 0 && !force) {
      return;
    }

    return new Promise((resolve, reject) => {
      fetch(state.api.getEntries.href, {
        method: state.api.getEntries.method,
        headers: getters.headers
      })
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

    commit("setEntriesByTag", {
      tag,
      entries: state.entries.filter(entry => entry.tags.includes(tag))
    });

    /*
    fetch(state.api.getEntriesByTag.href.replace("{tag}", tag), {
      method: state.api.getEntriesByTag.method
    })
      .then(response => response.json())
      .then(json => {
        commit("setEntriesByTag", { tag, entries: json.entries });
      });
      */
  },

  setTitle({ commit }, title) {
    commit("setTitle", { title });
  },

  setBreadcrumbs({ commit }, breadcrumbs) {
    commit("setBreadcrumbs", { breadcrumbs });
  },

  getTags({ state, commit, getters }) {
    if (state.tags.length > 0) {
      return;
    }

    fetch(state.api.getTags.href, {
      method: state.api.getTags.method,
      headers: getters.headers
    })
      .then(response => response.json())
      .then(json => {
        commit("setTags", { tags: json.tags });
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
  headers: state => ({ "x-functions-key": state.token }),
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
  entryFormIsOpen: state => state.entryFormIsOpen,
  rights: state => {
    return state.roles && state.user.role
      ? state.roles.filter(role => role.id === state.user.role)[0].rights
      : [];
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
