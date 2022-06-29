import { mapActions, mapMutations, mapState } from "vuex";

import BlogEntries from "@/components/BlogEntries";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "entries",

  components: { BlogEntries },

  props: {
    links: Array
  },

  data() {
    return {
      context: { id: "view", props: ["entries"] },
      gettingEntries: false,
      gettingEntriesCoolingDown: false,
      gettingEntriesCoolDown: 1500,
      hasLogged: ["/"]
    };
  },

  mounted() {
    this.addContext(this.context);
    window.addEventListener("scroll", this.scrollHandler);
    this.setTitle(this.title);
    this.initialize().then(() => {
      if (!this.list.length) {
        this.loadEntries();
      }
    });
    this.setBreadcrumbs([]);
  },

  beforeDestroy() {
    this.removeContext(this.context);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scrollHandler);
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      //"getEntries",
      //"getMoreEntries",
      "setBreadcrumbs",
      "setNextEntriesBatch",
      "setTitle",
      "apiRequest",
      "addContext",
      "removeContext"
    ]),

    ...mapMutations([
      "setEntries",
      "setEntryById",
      "setEndOfEntries",
      "setImageLink"
    ]),

    async getEntries() {
      const link = this.link("GET", "entries");
      if (link) {
        const { entries, end, links } = await this.apiRequest(link);
        this.setEntries({
          entries,
          ...(this.tag && { tag: this.tag }),
          ...(this.filterId && { filterId: this.filterId }),
          type: this.type
        });
        entries.forEach(entry => {
          this.setEntryById({ id: entry.id, entry });
        });
        this.setEndOfEntries({ type: this.type, end });
        const imageLink = this.linksByEntity("image", links);
        if (imageLink) {
          this.setImageLink({ link: imageLink[0] });
        }
      }
    },

    async getMoreEntries() {
      this.setNextEntriesBatch({ type: this.type });
      this.getEntries();
    },

    scrollHandler() {
      if (this.entryFormIsOpen) {
        return;
      }
      if (
        this.initialized &&
        this.$route.name === "entries" &&
        window.scrollY > this.windowYLoadNew &&
        !this.gettingEntries &&
        !this.end &&
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
      this[this.list.length ? "getMoreEntries" : "getEntries"]({
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
    }
  },

  computed: {
    ...mapState(["entries", "initialized", "entryFormIsOpen", "settings"]),

    title() {
      return process.env.VUE_APP_SITE_NAME;
    },

    list() {
      let entriesList = [];
      switch (this.type) {
        case "tag":
          entriesList = this.entries[this.type].list[this.tag]
            ? this.entries[this.type].list[this.tag]
            : [];
          break;
        case "filter":
          entriesList =
            this.entries[this.type] &&
            this.entries[this.type].list &&
            this.entries[this.type].list[this.filterId]
              ? this.entries[this.type].list[this.filterId]
              : [];
          break;
        default:
          entriesList = this.entries[this.type].list;
          break;
      }
      return entriesList;
    },

    reversedEntries() {
      return [...this.list].reverse();
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
    },

    end() {
      return this.entries[this.type].end;
    }
  },

  watch: {
    title(newTitle) {
      this.setTitle(newTitle);
    }
  }
};
