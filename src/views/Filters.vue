<template>
  <div class="filters">
    <admin-filters
      v-if="initialized && ready"
      :filters="filters"
      :links="filterLinks"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import AdminFilters from "@/components/Admin/AdminFilters";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "filters",

  components: { AdminFilters },

  props: {
    links: Array
  },

  data() {
    return {
      firstUpdate: true,
      context: { id: "view", props: ["filters"] },
      filterLinks: []
    };
  },

  async mounted() {
    this.addContext(this.context);
    this.update();
  },

  async updated() {
    this.update();
  },

  async beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["initialized", "user", "filters"]),

    ...mapGetters(["contextIsReady"]),

    ready() {
      return this.contextIsReady(this.context);
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "apiRequest",
      "addContext",
      "removeContext"
    ]),

    ...mapMutations(["setFilters"]),

    async update() {
      await this.initialize();
      if (this.ready && this.firstUpdate) {
        this.firstUpdate = false;
        const response = await this.apiRequest(this.link("GET", "filters"));
        this.setFilters({ filters: response.filters });
        this.filterLinks = response.links;
      }
      this.setBreadcrumbs([
        { href: "/admin", label: this.$strings.admin },
        { href: "/admin/filters", label: this.$strings.filters }
      ]);
      this.setTitle(this.$strings.filters);
    }
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_filters")) {
        this.$router.push({ path: "/access_denied" });
      }
    }
  }
};
</script>
