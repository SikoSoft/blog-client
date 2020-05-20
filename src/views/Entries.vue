<template>
  <div class="home">
    <blog-entries v-if="initialized" :entries="entries" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import BlogEntries from "@/components/BlogEntries.vue";

export default {
  name: "home",

  components: { BlogEntries },

  data() {
    return {
      gettingEntries: false,
      gettingEntriesCoolingDown: false,
      gettingEntriesCoolDown: 1500
    };
  },

  mounted() {
    window.addEventListener("scroll", () => {
      if (
        this.$route.name === "entries" &&
        window.scrollY > this.windowYLoadNew &&
        !this.gettingEntries &&
        !this.endOfEntries &&
        !this.gettingEntriesCoolingDown
      ) {
        this.loadEntries();
      }
    });

    this.setTitle(process.env.VUE_APP_SITE_NAME);
    this.initialize().then(() => {
      this.loadEntries();
    });
    this.setBreadcrumbs([]);
  },

  methods: {
    ...mapActions([
      "initialize",
      "getEntries",
      "getMoreEntries",
      "setBreadcrumbs",
      "setTitle"
    ]),

    loadEntries() {
      this.gettingEntries = true;
      this[this.entries.length ? "getMoreEntries" : "getEntries"]().then(() => {
        this.gettingEntries = false;
        this.gettingEntriesCoolingDown = true;
        this.gettingEntriesTimeout = setTimeout(() => {
          this.gettingEntriesCoolingDown = false;
        }, this.gettingEntriesCoolDown);
      });
    }
  },

  computed: {
    ...mapGetters(["initialized", "entries", "windowYLoadNew", "endOfEntries"])
  }
};
</script>
