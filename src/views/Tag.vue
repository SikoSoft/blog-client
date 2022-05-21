<template>
  <div class="tag">
    <blog-tag :tag="tag" />
    <blog-entries :type="type" :entries="list" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { parseVars } from "@/util/strings";
import BlogTag from "@/components/BlogTag";
import Entries from "@/shared/Entries";
import linkHandlers from "@/shared/linkHandlers";

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

    ...linkHandlers,

    ...mapActions(["getFilters"]),

    async postInit() {
      return this.getFilters();
    }
  }
};
</script>
