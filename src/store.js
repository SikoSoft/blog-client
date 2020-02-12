import Vue from "vue";
import Vuex from "vuex";
import { uuid } from "@/util/uuid";

const toastLife = 3000;

Vue.use(Vuex);

const state = {
  initialized: false,
  isLoading: true,
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
  token: "",
  editMode: {},
  toasts: [],
  comments: {},
  selectedComments: []
};

const mutations = {
  setInitialized: state => {
    state.initialized = true;
  },

  setLoading: (state, { loading }) => {
    state.isLoading = loading;
  },

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
      title === process.env.VUE_APP_SITE_NAME
        ? title
        : title + " | " + process.env.VUE_APP_SITE_NAME;
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
  },

  setEditMode: (state, { id, mode }) => {
    Vue.set(state.editMode, id, mode);
  },

  setEntryById: (state, { id, entry }) => {
    Vue.set(
      state,
      "entries",
      [...state.entries].map(e => {
        return id !== entry.id ? e : { ...entry, id };
      })
    );
  },

  setToasts: (state, { toasts }) => {
    Vue.set(state, "toasts", toasts);
  },

  setComments: (state, { id, comments }) => {
    Vue.set(state.comments, id, comments);
  },

  setSelectedComments: (state, { comments }) => {
    Vue.set(state, "selectedComments", comments);
  }
};

const actions = {
  initialize({ state, commit, getters }, force) {
    if (state.initialized && !force) {
      return Promise.resolve();
    }

    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (token) {
      commit("setToken", { token });
    }

    commit("setLoading", { loading: true });

    return fetch(process.env.VUE_APP_INIT, { headers: getters.headers })
      .then(response => response.json())
      .then(json => {
        commit("setUser", { user: { ...json.user, role: token ? 2 : 1 } });
        commit("setRoles", { roles: json.roles });
        commit("setApi", { api: json.api });
        commit("setInitialized");
        commit("setLoading", { loading: false });
      });
  },

  getEntries({ state, commit, getters }, force) {
    if (state.entries.length > 0 && !force) {
      return;
    }

    commit("setLoading", { loading: true });

    return new Promise((resolve, reject) => {
      fetch(state.api.getEntries.href, {
        method: state.api.getEntries.method,
        headers: getters.headers
      })
        .then(response => response.json())
        .then(json => {
          commit("setEntries", { entries: json.entries });
          commit("setLoading", { loading: false });
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
  },

  setEditMode({ commit }, { id, mode }) {
    commit("setEditMode", { id, mode });
  },

  setEntryById({ commit }, { id, entry }) {
    commit("setEntryById", { id, entry });
  },

  addToast({ state, commit, dispatch }, message) {
    const id = uuid();
    commit("setToasts", {
      toasts: [...state.toasts, { message, id }]
    });
    setTimeout(() => {
      dispatch("removeToast", id);
    }, toastLife);
  },

  removeToast({ state, commit }, id) {
    commit("setToasts", {
      toasts: state.toasts.filter(toast => toast.id !== id)
    });
  },

  getComments({ commit, getters }, { id, force }) {
    if (state.comments[id] && !force) {
      return Promise.resolve();
    }

    const api = getters.entryById(id).api;

    return new Promise((resolve, reject) => {
      fetch(api.getComments.href, {
        method: api.getComments.method,
        headers: getters.headers
      })
        .then(response => response.json())
        .then(json => {
          commit("setComments", { id, comments: json.comments });
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  toggleComment({ state, commit }, id) {
    const comments = [...state.selectedComments];
    const index = comments.indexOf(id);
    if (index === -1) {
      comments.push(id);
    } else {
      comments.splice(index, 1);
    }
    commit("setSelectedComments", { comments });
  },

  publishComments({ commit }) {
    commit("setSelectedComments", { comments: [] });
  },

  deleteComments({ commit }) {
    commit("setSelectedComments", { comments: [] });
  }
};

const getters = {
  headers: state => ({ "x-functions-key": state.token }),
  isLoading: state => state.isLoading,
  api: state => state.api,
  title: state => state.title,
  user: state => state.user,
  entries: state => state.entries,
  entriesByTag: state => state.entriesByTag,
  entryById: state => id => {
    return state.entries.filter(entry => entry.id === id)[0];
  },
  comments: state => state.comments,
  commentsByEntry: state => id => {
    return state.comments[id] ? state.comments[id] : [];
  },
  breadcrumbs: state => state.breadcrumbs,
  tags: state => state.tags,
  entryFormIsOpen: state => state.entryFormIsOpen,
  rights: state => {
    return state.roles && state.user.role
      ? state.roles.filter(role => role.id === state.user.role)[0].rights
      : [];
  },
  editMode: state => id => {
    return state.editMode[id] ? state.editMode[id] : false;
  },
  toasts: state => state.toasts,
  selectedComments: state => state.selectedComments,
  commentIsSelected: state => id => state.selectedComments.indexOf(id) > -1
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
