<template>
  <div class="filter">
    <blog-entries :type="type" :entries="entries" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import Entries from "@/shared/Entries.js";

export default {
  ...Entries,

  name: "entries-filter",

  computed: {
    ...Entries.computed,

    ...mapGetters(["filters"]),

    filterId() {
      return this.$route.params.filter;
    },

    entries() {
      return this.$store.getters.entriesByFilter(this.filterId);
    },

    title() {
      return this.$store.getters.filters.length
        ? this.$store.getters.filters.filter(
            filter => filter.id === this.filterId
          )[0].label
        : "";
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
