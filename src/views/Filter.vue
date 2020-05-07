<template>
  <div class="filter">
    <blog-entries :entries="entries" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BlogEntries from "@/components/BlogEntries.vue";

export default {
  name: "entries-filter",

  components: { BlogEntries },

  data() {
    return {
      isUpdating: false
    };
  },

  mounted() {
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    ...mapGetters(["filters"]),

    filter() {
      return this.$route.params.filter;
    },

    entries() {
      return this.$store.getters.entriesByFilter(this.filter);
    },

    label() {
      return this.$store.getters.filters.filter(
        filter => filter.id === this.filter
      )[0].label;
    }
  },

  methods: {
    ...mapActions([
      "initialize",
      "getFilters",
      "getEntriesByFilter",
      "setBreadcrumbs",
      "setTitle"
    ]),

    update() {
      if (this.isUpdating) {
        return;
      }
      this.isUpdating = true;
      this.initialize().then(() => {
        this.getFilters().then(() => {
          this.getEntriesByFilter({ filterId: this.filter }).then(() => {
            this.setBreadcrumbs([
              { href: `/filter/${this.filter}`, label: this.label }
            ]);
            this.setTitle(this.label);
            this.isUpdating = false;
          });
        });
      });
    }
  }
};
</script>
