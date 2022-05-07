<template>
  <div class="tag">
    <blog-tag :tag="tag" />
    <blog-entries :type="type" :entries="list" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { parseVars } from "@/util/strings.js";
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

    title() {
      return parseVars(this.$strings.entriesWithTag, { tag: this.tag });
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
