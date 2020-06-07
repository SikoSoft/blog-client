export default {
  initialized: false,
  isLoading: true,
  config: {},
  title: "",
  breadcrumbs: [],
  user: {},
  roles: [],
  entries: {
    default: {
      end: false,
      loadNew: 0,
      list: [],
      start: 0,
      top: 0
    },
    filter: {
      end: false,
      loadNew: 0,
      list: {},
      start: 0,
      top: 0
    },
    tag: {
      end: false,
      loadNew: 0,
      list: {},
      start: 0,
      top: 0
    }
  },
  entriesById: {},
  entriesFound: [],
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
  settings: {},
  tokens: [],
  drafts: [],
  draftsById: {},
  //windowYLoadNew: 0,
  //getEntriesStart: 0,
  //endOfEntries: false,
  imagesLoaded: {},
  filters: [],
  progress: 0,
  showProgressBar: false
};
