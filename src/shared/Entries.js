import { mapActions, mapGetters, mapState } from "vuex";

import BlogEntries from "@/components/BlogEntries.vue";

export default {
  name: "entries",

  components: { BlogEntries },

  data() {
    return {
      gettingEntries: false,
      gettingEntriesCoolingDown: false,
      gettingEntriesCoolDown: 1500,
      hasLogged: ["/"]
    };
  },

  mounted() {
    window.addEventListener("scroll", this.scrollHandler);
    this.setTitle(this.title);
    this.initialize().then(() => {
      this.postInit().then(() => {
        this.loadEntries();
      });
    });
    this.setBreadcrumbs([]);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },

  methods: {
    ...mapActions([
      "initialize",
      "getEntries",
      "getMoreEntries",
      "setBreadcrumbs",
      "setTitle"
    ]),

    scrollHandler() {
      if (this.entryFormIsOpen) {
        return;
      }
      if (
        this.initialized &&
        this.$route.name === "entries" &&
        window.scrollY > this.windowYLoadNew &&
        !this.gettingEntries &&
        !this.entries[this.type].end &&
        !this.gettingEntriesCoolingDown
      ) {
        this.loadEntries();
      }
      if (this.settings.auto_entry_url) {
        let path = this.path;
        let title = this.title;
        for (let i = 0; i < this.reversedEntries.length; i++) {
          let entry = this.reversedEntries[i];
          if (window.scrollY >= this.entryTops[entry.id]) {
            path = `/entry/${entry.id}`;
            title = entry.title;
            break;
          }
        }
        if (window.location.pathname !== path) {
          window.history.replaceState(null, title, path);
          if (
            process.env.NODE_ENV === "production" &&
            process.env.VUE_APP_TRACKING_CODE &&
            !this.hasLogged.includes(path)
          ) {
            window.gtag("config", process.env.VUE_APP_TRACKING_CODE, {
              page_path: path
            });
            this.hasLogged.push(path);
          }
        }
      }
    },

    loadEntries() {
      if (this.gettingEntries) {
        return;
      }
      this.gettingEntries = true;
      this[this.entries.length ? "getMoreEntries" : "getEntries"]({
        ...(this.tag && { tag: this.tag }),
        ...(this.filterId && { filterId: this.filterId }),
        type: this.type
      }).then(() => {
        this.gettingEntries = false;
        this.gettingEntriesCoolingDown = true;
        this.gettingEntriesTimeout = setTimeout(() => {
          this.gettingEntriesCoolingDown = false;
        }, this.gettingEntriesCoolDown);
      });
    },

    postInit() {
      return Promise.resolve();
    }
  },

  computed: {
    ...mapState(["entries"]),

    ...mapGetters([
      "initialized",
      "entryFormIsOpen",
      "settings"
    ]),

    title() {
      return process.env.VUE_APP_SITE_NAME;
    },

    reversedEntries() {
      return [...this.entries[this.type].list].reverse();
    },

    path() {
      return this.$route.path;
    },

    type() {
      return this.$options.name.replace("entries-", "");
    },

    windowYLoadNew() {
      return this.$store.getters.windowYLoadNew(this.type);
    },

    entryTops() {
      return this.$store.getters.entryTops(this.type);
    }
  },

  watch: {
    title(newTitle) {
      this.setTitle(newTitle);
    }
  }
};
