<template>
  <div class="filter">
    <blog-entries :type="type" :entries="list" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Entries from "@/shared/Entries";
import linkHandlers from "@/shared/linkHandlers";

export default {
  ...Entries,

  name: "entries-filter",

  computed: {
    ...Entries.computed,

    ...mapState(["filters"]),

    filterId() {
      return this.$route.params.filter;
    },

    title() {
      return this.filters.length
        ? this.filters.filter(filter => filter.id === this.filterId)[0].label
        : "";
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
