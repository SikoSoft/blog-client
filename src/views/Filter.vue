<template>
  <div class="filter">
    <blog-entries v-if="initialized && ready" :type="type" :entries="list" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Entries from "@/shared/Entries";
import linkHandlers from "@/shared/linkHandlers";

export default {
  ...Entries,

  name: "entries-filter",

  data() {
    return {
      firstUpdate: true,
      context: { id: "view", props: ["filter", this.$route.params.filter] }
    };
  },

  async mounted() {
    await this.addContext(this.context);
    await this.update();
  },

  computed: {
    ...Entries.computed,

    ...mapState(["initialized", "filters"]),

    ...mapGetters(["contextIsReady"]),

    filterId() {
      return this.$route.params.filter;
    },

    title() {
      return this.filters.length
        ? this.filters.filter(filter => filter.id === this.filterId)[0].label
        : "Filter";
    },

    ready() {
      return this.contextIsReady(this.context) && this.links.length;
    }
  },

  methods: {
    ...Entries.methods,

    ...linkHandlers,

    ...mapActions(["getFilters"]),

    async postInit() {
      return this.getFilters();
    },

    async update() {
      await this.initialize();
      if (this.ready && this.firstUpdate && this.links.length) {
        this.firstUpdate = false;
        const response = await this.apiRequest(this.link("GET", "filter"));
        this.setEntries({
          entries: response.entries,
          type: this.type,
          filterId: this.filterId
        });
      }
      this.setBreadcrumbs([
        { href: `/filter/${this.filterId}`, label: this.title }
      ]);
      this.setTitle(this.title);
    }
  },

  watch: {
    ready(value) {
      if (value && this.firstUpdate && this.links.length) {
        this.update();
      }
    },

    links(value) {
      if (value.length && this.ready && this.firstUpdate) {
        this.update();
      }
    }
  }
};
</script>
