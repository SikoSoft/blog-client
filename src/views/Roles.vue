<template>
  <div class="roles">
    <admin-roles v-if="initialized" v-bind="roles" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdminRoles from "@/components/Admin/AdminRoles";

export default {
  name: "roles",

  components: { AdminRoles },

  mounted() {
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    ...mapState(["initialized", "user"]),

    roles() {
      return this.$store.getters.roles;
    }
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle"]),

    async update() {
      await this.initialize();
      this.setBreadcrumbs([
        { href: "/admin", label: this.$strings.admin },
        { href: "/admin/roles", label: this.$strings.roles }
      ]);
      this.setTitle(this.$strings.roles);
    }
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_roles")) {
        this.$router.push({ path: "/access_denied" });
      }
    }
  }
};
</script>
