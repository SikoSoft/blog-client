<template>
  <div class="filters">
    <admin-filters v-if="initialized" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AdminFilters from "@/components/Admin/AdminFilters";

export default {
  name: "filters",

  components: { AdminFilters },

  async mounted() {
    this.addContext({ id: "view", props: ["filters"] });
    await this.initialize();
    this.setBreadcrumbs([
      { href: "/admin", label: this.$strings.admin },
      { href: "/admin/filters", label: this.$strings.filters }
    ]);
    this.setTitle(this.$strings.filters);
  },

  computed: {
    ...mapState(["initialized", "user"])
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle", "addContext"])
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
