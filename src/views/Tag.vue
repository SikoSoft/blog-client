<template>
  <div class="tag">
    <blog-tag :tag="tag" />
    <blog-entries :entries="entries" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import BlogTag from "@/components/BlogTag.vue";
import Entries from "@/shared/Entries.js";

export default {
  ...Entries,

  name: "entries-tag",

  components: { ...Entries.components, BlogTag },

  computed: {
    ...Entries.computed,

    tag() {
      return this.$route.params.tag;
    },

    entries() {
      return this.$store.getters.entriesByTag(this.tag);
    },

    title() {
      return this.$strings.entriesWithTag.replace("{tag}", this.tag);
    }
  },

  methods: {
    ...Entries.methods,

    ...mapActions(["getFilters"]),

    async postInit() {
      return this.getFilters();
    }
  }
};

/*
export default {
  name: "tag",

  components: { BlogTag, BlogEntries },

  mounted() {
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    ...mapGetters(["entriesByTag"]),

    tag() {
      return this.$route.params.tag;
    }
  },

  methods: {
    ...mapActions([
      "initialize",
      "getEntries",
      "getEntriesByTag",
      "setBreadcrumbs",
      "setTitle"
    ]),

    update() {
      this.initialize().then(() => {
        this.getEntries().then(() => {
          this.getEntriesByTag(this.tag);
          this.setBreadcrumbs([
            { href: "/tags", label: this.$strings.tags },
            { href: `/tag/${this.tag}`, label: this.tag }
          ]);
          this.setTitle(
            this.$strings.entriesWithTag.replace("{tag}", this.tag)
          );
        });
      });
    }
  }
};
*/
</script>
