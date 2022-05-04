export default {
  initialized: state => state.initialized,

  headers: state => ({
    "x-functions-key": state.authToken,
    "sess-token": state.sessToken
  }),

  isLoading: state => state.isLoading,

  links: state => state.links,

  title: state => state.title,

  user: state => state.user,

  entries: state => state.entries.default.list,

  entriesByTag: state => tag =>
    state.entries.tag.list[tag] ? state.entries.tag.list[tag] : [],

  entryById: state => id => {
    return state.entriesById[id]
      ? state.entriesById[id]
      : state.entries.default.list.filter(entry => entry.id === id)[0];
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

  roles: state => state.roles,

  tokens: state => state.tokens,

  drafts: state => state.drafts,

  draftById: state => id => {
    return state.draftsById[id]
      ? state.draftsById[id]
      : state.drafts.filter(draft => draft.id === id)[0];
  },

  windowYLoadNew: state => type => state.entries[type].loadNew,

  getEntriesStart: state => state.getEntriesStart,

  endOfEntries: state => state.endOfEntries,

  imagesLoaded: state => entryId =>
    state.imagesLoaded[entryId] ? state.imagesLoaded[entryId] : 0,

  filters: state => state.filters,

  filterRules: state => (state.filterRules ? state.filterRules : []),

  entriesByFilter: state => filter =>
    state.entries.filter.list[filter] ? state.entries.filter.list[filter] : [],

  showProgressBar: state => state.showProgressBar,

  progress: state => state.progress,

  entriesFound: state => state.entriesFound,

  entryTops: state => type => state.entries[type].top,

  settingListOptions: state => type => {
    let listOptions;
    switch (type) {
      case "roles":
        listOptions = state.roles.map(role => ({
          value: role.id,
          label: role.name
        }));
        return listOptions;
      default:
        return [];
    }
  }
};
