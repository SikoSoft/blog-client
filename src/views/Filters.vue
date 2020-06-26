<template>
  <div class="filters">
    <admin-filters v-if="initialized" />
  </div>
</template>

<script>
import AdminFilters from "@/components/Admin/AdminFilters.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "filters",

  components: { AdminFilters },

  mounted() {
    this.initialize().then(() => {
      this.setBreadcrumbs([
        { href: "/admin", label: this.$strings.admin },
        { href: "/admin/filters", label: this.$strings.filters }
      ]);
      this.setTitle(this.$strings.filters);
    });
  },

  computed: {
    ...mapGetters(["initialized"])
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle"])
  }
};
</script>
