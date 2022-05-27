import axios from "axios";
import { uuid } from "@/util/uuid";
import { arrayUnique, arrayHasObject } from "@/util/array";
import strings from "@/data/strings.json";
import { link } from "@/shared/linkHandlers";

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
        commit("setLinks", { links: json.links });
        commit("setSettings", { settings: json.settings });
        commit("setHeader", { header: json.header });
        commit("setInitialized");
        commit("setLoading", { loading: false });
      });
  },

  async getEntries(
    { state, commit, getters },
    { force, type, tag, filterId } = {}
  ) {
    if (state.entries.length > 0 && !force) {
      return Promise.resolve();
    }

    commit("setLoading", { loading: true });

    const start = state.entries[type].start;

    let getUrl, getMethod;
    switch (type) {
      case "tag":
        getUrl = state.links.getEntriesByTag.href.replace("{tag}", tag);
        getMethod = state.links.getEntriesByTag.method;
        break;
      case "filter":
        getUrl = state.links.getEntriesByFilter.href.replace(
          "{filter}",
          filterId
        );
        getMethod = state.links.getEntriesByFilter.method;
        break;
      default:
        getUrl = state.links.getEntries.href;
        getMethod = state.links.getEntries.method;
    }

    getUrl += start > 0 ? `/${start}` : "";

    return new Promise((resolve, reject) => {
      fetch(getUrl, {
        method: getMethod,
        headers: getters.headers
      })
        .then(response => response.json())
        .then(json => {
          commit("setEntries", {
            type,
            tag,
            filterId,
            entries: json.entries,
            append: true
          });
          json.entries.forEach(entry => {
            commit("setEntryById", { id: entry.id, entry });
          });
          commit("setEndOfEntries", { type, end: json.end });
          commit("setLoading", { loading: false });
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  getMoreEntries({ dispatch }, { type, filterId, tag }) {
    dispatch("setNextEntriesBatch", { type });
    dispatch("getEntries", { type, filterId, tag, force: true });
  },

  async getEntry(
    { commit, getters, dispatch },
    { links, id, force, addToList }
  ) {
    if (getters.entryById(id) && !force) {
      return Promise.resolve();
    }
    commit("setLoading", { loading: true });
    const { entry } = await dispatch("apiRequest", link("GET", "entry", links));
    commit("setEntryById", { id, entry });
    if (addToList) {
      dispatch("addEntryToList", { entry });
    }
    commit("setLoading", { loading: false });
  },

  async addEntryToList({ commit, state }, { entry }) {
    commit("setEntries", {
      type: "default",
      entries: [entry, ...state.entries.default.list]
    });
    commit("setEntriesStart", {
      type: "default",
      start: state.getEntriesStart + 1
    });
  },

  setTitle({ commit }, title) {
    commit("setTitle", { title });
  },

  setBreadcrumbs({ commit }, breadcrumbs) {
    commit("setBreadcrumbs", { breadcrumbs });
  },

  async getTags({ state, commit, dispatch }, { tag = "" }) {
    const response = await dispatch("apiRequest", {
      ...link("GET", "tags", state.links),
      query: { tag }
    });
    commit("setTags", { tags: response.tags });
    return response;
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

  async getComments({ state, commit, dispatch }, { links, entryId, force }) {
    if (state.comments[entryId] && !force) {
      return Promise.resolve();
    }
    const { comments } = await dispatch(
      "apiRequest",
      link("GET", "comments", links)
    );
    comments.forEach(comment => {
      commit("setComment", { id: comment.id, comment });
    });
    commit("setEntryComments", { entryId, comments });
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

  async setSetting({ commit, dispatch }, { links, id, value }) {
    await dispatch("apiRequest", {
      ...link("PUT", "setting", links),
      body: { value }
    });
    commit("setSetting", { id, value });
  },

  async getDrafts({ commit, state, dispatch }, { force = false }) {
    if (state.drafts.length && !force) {
      return Promise.resolve();
    }

    commit("setLoading", { loading: true });
    const { drafts } = await dispatch(
      "apiRequest",
      link("GET", "drafts", state.links)
    );
    commit("setDrafts", { drafts });
    commit("setLoading", { loading: false });
  },

  async getDraft({ state, commit, getters }, { id, force }) {
    if (getters.draftById(id) && !force) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      fetch(state.links.getDraft.href.replace("{id}", id), {
        method: state.links.getDraft.method,
        headers: getters.headers
      })
        .then(response => response.json())
        .then(json => {
          commit("setDraftById", { id: id, draft: json });
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  setNextEntriesBatch({ commit, state }, { type }) {
    commit("setEntriesStart", {
      type,
      start: state.entries[type].start + state.settings.per_load
    });
  },

  async getFilters({ commit, state }) {
    if (state.filters.length) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      fetch(state.links.getFilters.href, {
        method: state.links.getFilters.method
      })
        .then(response => response.json())
        .then(json => {
          commit("setFilters", { filters: json });
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

  deleteEntry: async ({ state, commit, dispatch }, { links, id }) => {
    await dispatch("apiRequest", link("DELETE", "entry", links));
    commit("deleteEntry", { id });
    commit("setEntriesStart", {
      type: "default",
      start: state.getEntriesStart - 1
    });
  },

  deleteDraft: async ({ commit, dispatch }, { links, id }) => {
    await dispatch("apiRequest", link("DELETE", "draft", links));
    commit("deleteDraft", { id });
  },

  setProgress: ({ state, commit }, { progress }) => {
    if (progress > 0 && !state.showProgressBar) {
      commit("setShowProgressBar", { show: true });
    }
    if (progress === 1) {
      setTimeout(() => {
        commit("setShowProgressBar", { show: false });
      }, 1000);
    }
    commit("setProgress", { progress });
  },

  findEntries: ({ state, commit, getters }, { title }) => {
    fetch(`${state.links.findEntry.href}?title=${title}`, {
      method: state.links.findEntry.method,
      headers: getters.headers
    })
      .then(result => result.json())
      .then(json => {
        commit("setEntriesFound", { entriesFound: json });
      });
  },

  updateFilter: ({ state, commit, getters, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      fetch(state.links.updateFilter.href.replace("{filter}", payload.id), {
        method: state.links.updateFilter.method,
        headers: getters.headers,
        body: JSON.stringify(payload)
      })
        .then(result => result.json())
        .then(() => {
          commit("setFilter", payload);
          dispatch("addToast", strings.filterUpdated);
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  createFilter: (
    { state, commit, getters, dispatch },
    { newId, label, image }
  ) => {
    return new Promise((resolve, reject) => {
      fetch(state.links.newFilter.href, {
        method: state.links.newFilter.method,
        headers: getters.headers,
        body: JSON.stringify({ id: newId, label, image })
      })
        .then(result => result.json())
        .then(() => {
          commit("addFilter", { id: newId, label, image });
          dispatch("addToast", strings.filterAdded);
          resolve();
        })
        .catch(e => reject(e));
    });
  },

  deleteFilter: ({ state, commit, getters, dispatch }, { id }) => {
    return new Promise(resolve => {
      fetch(state.links.deleteFilter.href.replace("{filter}", id), {
        method: state.links.deleteFilter.method,
        headers: getters.headers
      })
        .then(result => result.json())
        .then(() => {
          commit("deleteFilter", { id });
          dispatch("addToast", strings.filterDeleted);
          resolve();
        });
    });
  },

  setFilterOrder: (
    { state, commit, getters, dispatch },
    { orderedFilters }
  ) => {
    return new Promise(resolve => {
      fetch(state.links.saveFilterOrder.href, {
        method: state.links.saveFilterOrder.method,
        headers: getters.headers,
        body: JSON.stringify({ orderedFilters })
      })
        .then(result => result.json())
        .then(() => {
          commit("setFilterOrder", { orderedFilters });
          dispatch("addToast", strings.filterOrderSaved);
          resolve();
        });
    });
  },

  getFilterRules: ({ state, commit, getters }) => {
    return new Promise(resolve => {
      fetch(state.links.getFilterRules.href, {
        method: state.links.getFilterRules.method,
        headers: getters.headers
      })
        .then(result => result.json())
        .then(({ rules }) => {
          commit("setFilterRules", { rules });
          resolve(rules);
        });
    });
  },

  addFilterRule: (
    { state, getters, dispatch, commit },
    { filterId, type, value, operator }
  ) => {
    return new Promise(resolve => {
      fetch(state.links.addFilterRule.href.replace("{filterId}", filterId), {
        method: state.links.addFilterRule.method,
        headers: getters.headers,
        body: JSON.stringify({ type, value, operator })
      })
        .then(result => result.json())
        .then(json => {
          dispatch("addToast", strings.filterRuleAdded);
          commit("addFilterRule", {
            filterId,
            id: json.id,
            type,
            value,
            operator
          });
          resolve();
        });
    });
  },

  deleteFilterRule: (
    { state, getters, dispatch, commit },
    { filterId, id }
  ) => {
    return new Promise(resolve => {
      fetch(state.links.deleteFilterRule.href.replace("{filterId}", filterId), {
        method: state.links.deleteFilterRule.method,
        headers: getters.headers,
        body: JSON.stringify({ id })
      })
        .then(result => result.json())
        .then(() => {
          dispatch("addToast", strings.filterRuleDeleted);
          commit("deleteFilterRule", { id });
          resolve();
        });
    });
  },

  updateFilterRule: (
    { state, getters, dispatch, commit },
    { filterId, id, type, value, operator }
  ) => {
    return new Promise(resolve => {
      fetch(state.links.saveFilterRule.href.replace("{filterId}", filterId), {
        method: state.links.saveFilterRule.method,
        headers: getters.headers,
        body: JSON.stringify({ id, type, value, operator })
      })
        .then(result => result.json())
        .then(() => {
          dispatch("addToast", strings.filterRuleAdded);
          commit("updateFilterRule", {
            filterId,
            id,
            type,
            value,
            operator
          });
          resolve();
        });
    });
  },

  getRoleRights: async ({ state, commit, dispatch }, { links }) => {
    if (state.roleRights.length) {
      return Promise.resolve();
    }

    const response = await dispatch(
      "apiRequest",
      link("GET", "roleRights", links)
    );
    commit("setRoleRights", { roleRights: response.roleRights });
    return response;
  },

  addRoleRight: async ({ commit, dispatch }, { links, action }) => {
    const { right } = await dispatch("apiRequest", {
      ...link("POST", "roleRight", links),
      body: { action }
    });
    commit("addRoleRight", { right });
  },

  deleteRoleRight: ({ state, commit, getters }, { role, action }) => {
    return new Promise(resolve => {
      fetch(
        state.links.deleteRoleRight.href
          .replace("{role}", role)
          .replace("{action}", action),
        {
          method: state.links.deleteRoleRight.method,
          headers: getters.headers
        }
      )
        .then(result => result.json())
        .then(() => {
          commit("deleteRoleRight", { role, action });
          resolve();
        });
    });
  },

  getTagRoles: async ({ state, commit, dispatch }, { links }) => {
    if (state.tagRoles.length) {
      return Promise.resolve();
    }

    const response = await dispatch(
      "apiRequest",
      link("GET", "tagRoles", links)
    );
    commit("setTagRoles", { tagRoles: response.tagRoles });
    return response;
  },

  addTagRole: async ({ commit, dispatch }, { role, links }) => {
    const { tagRole } = await dispatch("apiRequest", {
      ...link("POST", "tagRole", links),
      body: { role }
    });
    commit("addTagRole", { tagRole });
  },

  deleteTagRole: async ({ commit, dispatch }, { tag, role, links }) => {
    await dispatch("apiRequest", link("DELETE", "tagRole", links));
    commit("deleteTagRole", { tag, role });
  },

  addRole: ({ state, commit, getters }, { name }) => {
    return new Promise(resolve => {
      fetch(state.links.addRole.href, {
        method: state.links.addRole.method,
        headers: getters.headers,
        body: JSON.stringify({ name })
      })
        .then(result => result.json())
        .then(({ id }) => {
          commit("addRole", { id, name });
          resolve();
        });
    });
  },

  deleteRole: ({ state, commit, getters }, { id }) => {
    return new Promise(resolve => {
      fetch(state.links.deleteRole.href.replace("{role}", id), {
        method: state.links.deleteRole.method,
        headers: getters.headers
      })
        .then(result => result.json())
        .then(() => {
          commit("deleteRole", { id });
          resolve();
        });
    });
  },

  updateRole: ({ state, commit, getters }, { id, name }) => {
    return new Promise(resolve => {
      fetch(state.links.updateRole.href.replace("{role}", id), {
        method: state.links.updateRole.method,
        headers: getters.headers,
        body: JSON.stringify({ name })
      })
        .then(result => result.json())
        .then(() => {
          commit("updateRole", { id });
          resolve();
        });
    });
  },

  apiRequest: async ({ getters }, payload) => {
    if (!payload) {
      return;
    }
    const { data } = await axios({
      url: payload.href,
      method: payload.method,
      headers: {
        ...getters.headers,
        ...(payload.key ? { "x-functions-key": payload.key } : {})
      },
      ...(payload.body ? { data: payload.body } : {}),
      ...(payload.query ? { params: payload.query } : {})
    });
    return data;
  },

  addContext: async ({ state, commit, dispatch }, context) => {
    if (!context) {
      return;
    }
    commit("setContextInitialized", { status: false });
    commit("setContext", { context: [...state.context, context] });

    if (state.initialized && !arrayHasObject(state.contextHistory, context)) {
      await dispatch("getContextLinks");
    } else {
      commit("setContextInitialized", { status: true });
    }

    commit("setContextHistory", {
      contextHistory: arrayUnique([...state.contextHistory, context])
    });
  },

  removeContext: async ({ state, commit }, context) => {
    console.log("removeContext", JSON.stringify(context));
    commit("setContext", {
      context: [
        ...state.context.filter(
          contextRecord =>
            JSON.stringify(contextRecord) !== JSON.stringify(context)
        )
      ]
    });
  },

  getContextLinks: async ({ state, dispatch, commit }) => {
    const { links } = await dispatch(
      "apiRequest",
      link("GET", "contextLinks", state.links)
    );
    commit("setLinks", { links: arrayUnique([...state.links, ...links]) });
    commit("setContextInitialized", { status: true });
  },

  getSettings: async ({ commit, dispatch }, { links }) => {
    const { settings } = await dispatch(
      "apiRequest",
      link("GET", "settings", links)
    );
    commit("setSettingsConfig", { settings });
  },

  async getBanners({ commit, dispatch, state }) {
    const response = await dispatch(
      "apiRequest",
      link("GET", "banners", state.links)
    );
    commit("setBanners", { banners: response.banners });
    return response;
  }
};
