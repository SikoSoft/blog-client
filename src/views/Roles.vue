<template>
  <div class="roles">
    <admin-roles v-if="initialized" v-bind="roles" :links="links" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdminRoles from "@/components/Admin/AdminRoles";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "roles",

  components: { AdminRoles },

  props: {
    links: Array
  },

  async mounted() {
    await this.addContext({ id: "view", props: ["roles"] });
    this.update();
  },

  updated() {
    //this.update();
  },

  computed: {
    ...mapState(["initialized", "user"]),

    roles() {
      return this.$store.getters.roles;
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["initialize", "setBreadcrumbs", "setTitle", "addContext"]),

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
