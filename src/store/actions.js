import { uuid } from "@/util/uuid";
import strings from "@/data/strings.json";

export default {
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

  async getEntries({ state, commit, getters }, force) {
    if (state.entries.length > 0 && !force) {
      return Promise.resolve();
    }

    commit("setLoading", { loading: true });

    const getUrl =
      state.getEntriesStart === 0
        ? state.api.getEntries.href
        : `${state.api.getEntries.href}/${state.getEntriesStart}`;

    return new Promise((resolve, reject) => {
      fetch(getUrl, {
        method: state.api.getEntries.method,
        headers: getters.headers
      })
        .then(response => response.json())
        .then(json => {
          commit("setEntries", {
            entries: json.entries,
            append: true
          });
          commit("setEndOfEntries", { end: json.end });
          commit("setLoading", { loading: false });
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  getMoreEntries({ dispatch }) {
    dispatch("setNextEntriesBatch");
    dispatch("getEntries", true);
  },

  getEntriesByTag({ state, commit }, tag) {
    if (state.entriesByTag[tag]) {
      return;
    }

    commit("setEntriesByTag", {
      tag,
      entries: state.entries.filter(entry => entry.tags.includes(tag))
    });
  },

  async getEntry({ state, commit, getters }, { id, force, addToList }) {
    if (getters.entryById(id) && !force) {
      return Promise.resolve();
    }

    commit("setLoading", { loading: true });

    return new Promise((resolve, reject) => {
      fetch(state.api.getEntry.href.replace("{id}", id), {
        method: state.api.getEntry.method,
        headers: getters.headers
      })
        .then(response => response.json())
        .then(json => {
          commit("setEntryById", { id, entry: json });
          if (addToList) {
            commit("setEntries", { entries: [json, ...state.entries] });
            commit("setGetEntriesStart", { start: state.getEntriesStart + 1 });
          }
          commit("setLoading", { loading: false });
          resolve();
        })
        .catch(e => reject(e));
    });
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

  setDraftById({ commit }, { id, draft }) {
    commit("setDraftById", { id, draft });
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

  getComments({ state, commit, getters }, { entryId, force }) {
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

  deleteComments({ state, commit, dispatch, getters }) {
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

  setSetting({ commit, state, getters }, { id, value }) {
    fetch(state.api.saveSetting.href, {
      method: state.api.saveSetting.method,
      headers: getters.headers,
      body: JSON.stringify({ id, value })
    })
      .then(response => response.json())
      .then(() => {
        commit("setSetting", { id, value });
      });
  },

  getDrafts({ commit, state, getters }, force) {
    if (state.drafts.length && !force) {
      return Promise.resolve();
    }

    commit("setLoading", { loading: true });

    return new Promise((resolve, reject) => {
      fetch(state.api.getDrafts.href, {
        method: state.api.getDrafts.method,
        headers: getters.headers
      })
        .then(response => response.json())
        .then(({ drafts }) => {
          commit("setDrafts", { drafts });
          commit("setLoading", { loading: false });
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  async getDraft({ state, commit, getters }, { id, force }) {
    if (getters.draftById(id) && !force) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      fetch(state.api.getDraft.href.replace("{id}", id), {
        method: state.api.getDraft.method,
        headers: getters.headers
      })
        .then(response => response.json())
        .then(json => {
          commit("setDraftById", { draftId: id, entry: json });
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  setNextEntriesBatch({ commit, state }) {
    commit("setGetEntriesStart", {
      start: state.getEntriesStart + state.settings.per_load
    });
  },

  async getFilters({ commit, state }) {
    if (state.filters.length) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      fetch(state.api.getFilters.href, { method: state.api.getFilters.method })
        .then(response => response.json())
        .then(json => {
          commit("setFilters", { filters: json });
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  async getEntriesByFilter({ commit, state }, { filterId }) {
    if (state.entriesByFilter[filterId]) {
      return Promise.resolve();
    }

    commit("setLoading", { loading: true });

    return new Promise((resolve, reject) => {
      fetch(state.api.getEntriesByFilter.href.replace("{filter}", filterId), {
        method: state.api.getEntriesByFilter.method
      })
        .then(response => response.json())
        .then(json => {
          commit("setEntriesByFilter", { filterId, entries: json.entries });
          commit("setLoading", { loading: false });
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  updateEntryId: ({ commit, getters }, { id, newId }) => {
    commit("setEntryById", {
      id,
      entry: { ...getters.entryById(id), id: newId }
    });
  },

  updateDraftId: ({ commit, getters }, { id, newId }) => {
    commit("setDraftById", {
      id,
      draft: { ...getters.draftById(id), id: newId }
    });
  },

  deleteEntry: ({ state, commit, getters }, { id }) => {
    const entry = getters.entryById(id);
    fetch(entry.api.delete.href, {
      method: entry.api.delete.method,
      headers: getters.headers
    })
      .then(response => response.json())
      .then(() => {
        commit("deleteEntry", { id });
        commit("setGetEntriesStart", { start: state.getEntriesStart - 1 });
      });
  }
};
