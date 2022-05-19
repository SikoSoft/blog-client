import { uuid } from "@/util/uuid";
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

  async getEntry({ state, commit, getters }, { id, force, addToList }) {
    if (getters.entryById(id) && !force) {
      return Promise.resolve();
    }

    commit("setLoading", { loading: true });

    return new Promise((resolve, reject) => {
      fetch(state.links.getEntry.href.replace("{id}", id), {
        method: state.links.getEntry.method,
        headers: getters.headers
      })
        .then(response => response.json())
        .then(json => {
          commit("setEntryById", { id, entry: json });
          if (addToList) {
            commit("setEntries", {
              type: "default",
              entries: [json, ...state.entries.default.list]
            });
            commit("setEntriesStart", {
              type: "default",
              start: state.getEntriesStart + 1
            });
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

    fetch(state.links.getTags.href, {
      method: state.links.getTags.method,
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

  setSetting({ commit, state, getters }, { id, value }) {
    fetch(state.links.saveSetting.href, {
      method: state.links.saveSetting.method,
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
      fetch(state.links.getDrafts.href, {
        method: state.links.getDrafts.method,
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

  deleteEntry: ({ state, commit, getters }, { id }) => {
    const entry = getters.entryById(id);
    fetch(entry.links.delete.href, {
      method: entry.links.delete.method,
      headers: getters.headers
    })
      .then(response => response.json())
      .then(() => {
        commit("deleteEntry", { id });
        commit("setEntriesStart", {
          type: "default",
          start: state.getEntriesStart - 1
        });
      });
  },

  deleteDraft: ({ commit, getters }, { id }) => {
    const draft = getters.draftById(id);
    fetch(draft.links.delete.href, {
      method: draft.links.delete.method,
      headers: getters.headers
    })
      .then(response => response.json())
      .then(() => {
        commit("deleteDraft", { id });
      });
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

  getRoleRights: ({ state, commit, getters }) => {
    if (state.roleRights.length) {
      return Promise.resolve();
    }

    return new Promise(resolve => {
      fetch(state.links.getRoleRights.href, {
        method: state.links.getRoleRights.method,
        headers: getters.headers
      })
        .then(result => result.json())
        .then(roleRights => {
          commit("setRoleRights", { roleRights });
          resolve();
        });
    });
  },

  addRoleRight: ({ state, commit, getters }, { role, action }) => {
    return new Promise(resolve => {
      fetch(
        state.links.addRoleRight.href
          .replace("{role}", role)
          .replace("{action}", action),
        {
          method: state.links.addRoleRight.method,
          headers: getters.headers
        }
      )
        .then(result => result.json())
        .then(({ right }) => {
          commit("addRoleRight", { right });
          resolve();
        });
    });
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

  getTagRoles: ({ state, commit, getters }) => {
    if (state.tagRoles.length) {
      return Promise.resolve();
    }

    return new Promise(resolve => {
      fetch(state.links.getTagRoles.href, {
        method: state.links.getTagRoles.method,
        headers: getters.headers
      })
        .then(result => result.json())
        .then(tagRoles => {
          commit("setTagRoles", { tagRoles });
          resolve();
        });
    });
  },

  addTagRole: ({ state, commit, getters }, { tag, role }) => {
    return new Promise(resolve => {
      fetch(
        state.links.addTagRole.href
          .replace("{tag}", tag)
          .replace("{role}", role),
        {
          method: state.links.addTagRole.method,
          headers: getters.headers
        }
      )
        .then(result => result.json())
        .then(() => {
          commit("addTagRole", { tag, role });
          resolve();
        });
    });
  },

  deleteTagRole: ({ state, commit, getters }, { tag, role }) => {
    return new Promise(resolve => {
      fetch(
        state.links.deleteTagRole.href
          .replace("{tag}", tag)
          .replace("{role}", role),
        {
          method: state.links.deleteTagRole.method,
          headers: getters.headers
        }
      )
        .then(result => result.json())
        .then(() => {
          commit("deleteTagRole", { tag, role });
          resolve();
        });
    });
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

  apiRequest: ({ getters }, payload) => {
    return new Promise(resolve => {
      fetch(payload.href, {
        method: payload.method,
        headers: { ...getters.headers, "x-functions-key": payload.key },
        ...(payload.body ? { body: JSON.stringify(payload.body) } : {})
      })
        .then(result => result.json())
        .then(json => {
          resolve(json);
        });
    });
  }
};
