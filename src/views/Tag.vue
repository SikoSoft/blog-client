<template>
  <div class="tag">
    <blog-tag :tag="tag" />
    <blog-entries :type="type" :entries="list" />
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

    /*
    entries() {
      return this.$store.getters.entriesByTag(this.tag);
    },
    */

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
</script>
