import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import axisMockAdapter from "axios-mock-adapter";

Vue.use(Vuex);

const mock = new axisMockAdapter(axios);

mock.onGet("/entries").reply(200, {
  entries: [
    {
      created: 1564948499,
      title: "testing 123",
      body: [
        { insert: "Fuck off" },
        { attributes: { header: 1 }, insert: "\n" },
        { insert: "\n" },
        { attributes: { italic: true }, insert: "pretentious" },
        { insert: "\n\n" },
        { attributes: { underline: true }, insert: "blah" },
        { insert: "\n" }
      ]
    }
  ].map(entry => {
    const date = new Date(entry.created * 1000);
    return {
      ...entry,
      id: `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}/${entry.title.toLowerCase().replace(/ /g, "-")}`
    };
  })
});

mock.onGet("/user").reply(200, {
  role: 1
});

mock.onGet("/roles").reply(200, {
  roles: [
    { id: 0, name: "guest", rights: ["r"] },
    { id: 1, name: "admin", rights: ["c", "r", "u", "d"] }
  ]
});

const state = {
  title: "Title",
  user: {},
  roles: [],
  entries: []
};

const mutations = {
  setEntries: (state, { entries }) => {
    Vue.set(state, "entries", entries);
  },

  setUser: (state, { user }) => {
    Vue.set(state, "user", user);
  },

  setRoles: (state, { roles }) => {
    Vue.set(state, "roles", roles);
  },

  setTitle: (state, { title }) => {
    state.title = title;
  },

  getEntries: () => {
    console.log("test");
  }
};

const actions = {
  initialize({ dispatch }) {
    dispatch("getUser");
    dispatch("getRoles");
  },

  getUser({ state, commit }) {
    if (state.user.role) {
      return;
    }

    axios.get("/user").then(response => {
      console.log(response.data);
      commit("setUser", { user: response.data });
    });
  },

  getRoles({ state, commit }) {
    if (state.roles.length > 0) {
      return;
    }

    axios.get("/roles").then(response => {
      console.log(response.data.roles);
      commit("setRoles", { roles: response.data.roles });
    });
  },

  getEntries({ state }) {
    if (state.entries.length > 0) {
      return;
    }

    axios.get("/entries").then(response => {
      console.log("fetched entries");
      Vue.set(state, "entries", response.data.entries);
    });
  },

  setTitle({ commit }, title) {
    commit("setTitle", { title });
  }
};

const getters = {
  entries: state => state.entries,
  entryById: state => id => {
    return state.entries.filter(entry => entry.id === id)[0];
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
