import Vue from "vue";
import Vuex from "vuex";
import { uuid } from "@/util/uuid";
import strings from "@/data/strings.json";

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
  entryComments: {},
  selectedComments: [],
  settings: {}
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

  setSessToken: (state, { sessToken }) => {
    state.sessToken = sessToken;
  },

  setAuthToken: (state, { authToken }) => {
    state.authToken = authToken;
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

  setComment: (state, { id, comment }) => {
    Vue.set(state.comments, id, comment);
  },

  setEntryComments: (state, { entryId, comments }) => {
    Vue.set(state.entryComments, entryId, comments);
  },

  deleteComment: (state, { id }) => {
    const newComments = { ...state.comments };
    Vue.set(
      state.entryComments,
      state.comments[id].entry_id,
      state.entryComments[state.comments[id].entry_id].filter(
        comment => comment.id !== id
      )
    );
    delete newComments[id];
    Vue.set(state, "comments", newComments);
  },

  setSelectedComments: (state, { comments }) => {
    Vue.set(state, "selectedComments", comments);
  },

  setSettings: (state, { settings }) => {
    Vue.set(state, "settings", settings);
  },

  setSetting: (state, { id, value }) => {
    state.settings[id] = value;
  }
};

const actions = {
  initialize({ state, commit, getters }, force) {
    if (state.initialized && !force) {
      return Promise.resolve();
    }

    const sessToken = localStorage.getItem("sessToken")
      ? localStorage.getItem("sessToken")
      : "";
    if (sessToken) {
      commit("setSessToken", { sessToken });
    }

    const authToken = localStorage.getItem("authToken")
      ? localStorage.getItem("authToken")
      : "";
    if (authToken) {
      commit("setAuthToken", { authToken });
    }

    commit("setLoading", { loading: true });

    return fetch(process.env.VUE_APP_INIT, { headers: getters.headers })
      .then(response => response.json())
      .then(json => {
        commit("setUser", { user: { ...json.user } });
        commit("setRoles", { roles: json.roles });
        commit("setApi", { api: json.api });
        commit("setSettings", { settings: json.settings });
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
    }, state.settings.toast_life);
  },

  removeToast({ state, commit }, id) {
    commit("setToasts", {
      toasts: state.toasts.filter(toast => toast.id !== id)
    });
  },

  getComments({ commit, getters }, { entryId, force }) {
    if (state.comments[entryId] && !force) {
      return Promise.resolve();
    }

    const api = getters.entryById(entryId).api;

    return new Promise((resolve, reject) => {
      fetch(api.getComments.href, {
        method: api.getComments.method,
        headers: getters.headers
      })
        .then(response => response.json())
        .then(json => {
          json.comments.forEach(comment => {
            commit("setComment", { id: comment.id, comment });
          });
          commit("setEntryComments", { entryId, comments: json.comments });
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

  publishComments({ state, commit, getters, dispatch }) {
    fetch(state.api.publishComments.href, {
      method: state.api.publishComments.method,
      headers: getters.headers,
      body: JSON.stringify({ ids: state.selectedComments })
    })
      .then(response => response.json())
      .then(() => {
        state.selectedComments.forEach(commentId => {
          if (state.comments[commentId]) {
            state.comments[commentId].public = 1;
          }
        });
        commit("setSelectedComments", { comments: [] });
        dispatch("addToast", strings.commentsPublished);
      });
  },

  deleteComments({ commit, dispatch }) {
    fetch(state.api.deleteComments.href, {
      method: state.api.deleteComments.method,
      headers: getters.headers,
      body: JSON.stringify({ ids: state.selectedComments })
    })
      .then(response => response.json())
      .then(() => {
        state.selectedComments.forEach(commentId => {
          commit("deleteComment", { id: commentId });
        });
        commit("setSelectedComments", { comments: [] });
        dispatch("addToast", strings.commentsDeleted);
      });
  },

  setSetting({ commit }, { id, value }) {
    fetch(state.api.saveSetting.href, {
      method: state.api.saveSetting.method,
      headers: getters.headers,
      body: JSON.stringify({ id, value })
    })
      .then(response => response.json())
      .then(() => {
        commit("setSetting", { id, value });
      });
  }
};

const getters = {
  initialized: state => state.initialized,
  headers: state => ({
    "x-functions-key": state.authToken,
    "sess-token": state.sessToken
  }),
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
  commentById: state => id => {
    let comment = false;
    Object.keys.forEach(entryId => {
      comment = state.comments[entryId].filter(comment => comment.id === id);
    });
    return comment;
  },
  commentsByEntry: state => entryId => {
    return state.entryComments[entryId] ? state.entryComments[entryId] : [];
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
  commentIsSelected: state => id => state.selectedComments.indexOf(id) > -1,
  settings: state => state.settings
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
