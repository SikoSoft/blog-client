import Vue from "vue";

export default {
  setInitialized: state => {
    state.initialized = true;
  },

  setLoading: (state, { loading }) => {
    state.isLoading = loading;
  },

  setEntries: (state, { entries, type, tag, filterId, append }) => {
    const target =
      type === "default" ? state.entries[type] : state.entries[type].list;
    const value = type === "tag" ? tag : type === "filter" ? filterId : "list";
    if (append) {
      Vue.set(target, value, [
        ...(target[value] ? target[value] : []),
        ...entries
      ]);
    } else {
      Vue.set(target, value, [...entries]);
    }
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
    Vue.set(state.entriesById, entry.id, entry);
    Vue.set(
      state.entries.default,
      "list",
      [...state.entries.default.list].map(e => {
        return id !== e.id ? e : { ...entry, id: entry.id };
      })
    );
  },

  setDraftById: (state, { id, draft }) => {
    Vue.set(state.draftsById, id, draft);
    Vue.set(
      state,
      "drafts",
      [...state.drafts].map(d => {
        return id !== d.id ? d : { ...draft, id };
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
  },

  setDrafts: (state, { drafts }) => {
    state.drafts = drafts;
  },

  setWindowYLoadNew: (state, { type, windowY }) => {
    state.entries[type].loadNew = windowY;
  },

  setEntriesStart: (state, { type, start }) => {
    state.entries[type].start = start;
  },

  setEndOfEntries: (state, { type, end }) => {
    state.entries[type].end = end;
  },

  imageLoaded: (state, { entryId }) => {
    Vue.set(
      state.imagesLoaded,
      entryId,
      state.imagesLoaded[entryId] ? state.imagesLoaded[entryId] + 1 : 1
    );
  },

  setFilters: (state, { filters }) => {
    state.filters = filters;
  },

  deleteEntry: (state, { id }) => {
    Vue.set(
      state.entries.default,
      "list",
      state.entries.default.list.filter(entry => entry.id !== id)
    );
    ["tag", "filter"].forEach(type => {
      Object.keys(state.entries[type].list).forEach(listId => {
        Vue.set(
          state.entries[type].list,
          listId,
          state.entries[type].list[listId].filter(entry => entry.id !== id)
        );
      });
    });
  },

  deleteDraft: (state, { id }) => {
    Vue.set(
      state,
      "drafts",
      state.drafts.filter(draft => draft.id !== id)
    );
  },

  setProgress: (state, { progress }) => {
    state.progress = progress;
  },

  setShowProgressBar: (state, { show }) => {
    state.showProgressBar = show;
  },

  setEntriesFound: (state, { entriesFound }) => {
    state.entriesFound = entriesFound;
  },

  setEntryTop: (state, { type, id, top }) => {
    Vue.set(state.entries[type].top, id, top);
  }
};
