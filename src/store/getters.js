export default {
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
    return state.entriesById[id]
      ? state.entriesById[id]
      : state.entries.filter(entry => entry.id === id)[0];
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

  settings: state => state.settings,

  tokens: state => state.tokens,

  drafts: state => state.drafts,

  draftById: state => id => {
    return state.draftsById[id]
      ? state.draftsById[id]
      : state.drafts.filter(draft => draft.id === id)[0];
  },

  windowYLoadNew: state => state.windowYLoadNew,

  getEntriesStart: state => state.getEntriesStart,

  endOfEntries: state => state.endOfEntries,

  imagesLoaded: state => entryId =>
    state.imagesLoaded[entryId] ? state.imagesLoaded[entryId] : 0,

  filters: state => state.filters,

  entriesByFilter: state => filter =>
    state.entriesByFilter[filter] ? state.entriesByFilter[filter] : [],

  showProgressBar: state => state.showProgressBar,

  progress: state => state.progress,

  entriesFound: state => state.entriesFound,

  entryTops: state => state.entryTops
};
