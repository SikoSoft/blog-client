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
      top: {}
    },
    filter: {
      end: false,
      loadNew: 0,
      list: {},
      start: 0,
      top: {}
    },
    tag: {
      end: false,
      loadNew: 0,
      list: {},
      start: 0,
      top: {}
    }
  },
  entriesById: {},
  entriesFound: [],
  tags: [],
  adminPaneIsOpen: false,
  entryFormIsOpen: false,
  links: {},
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
  imagesLoaded: {},
  filters: [],
  filterRules: [],
  progress: 0,
  showProgressBar: false,
  sessToken: "",
  authToken: "",
  roleRights: [],
  tagRoles: []
};
