<template>
  <div class="roles">
    <admin-roles
      v-if="initialized && contextIsReady(context)"
      v-bind="roles"
      :links="rolesLinks"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import AdminRoles from "@/components/Admin/AdminRoles";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "roles",

  components: { AdminRoles },

  props: {
    links: Array
  },

  data() {
    return {
      context: { id: "view", props: ["roles"] },
      rolesLinks: []
    };
  },

  async created() {
    await this.addContext(this.context);
  },

  async mounted() {
    await this.update();
  },

  beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["initialized", "user", "roles"]),

    ...mapGetters(["contextIsReady"])
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "addContext",
      "removeContext",
      "apiRequest"
    ]),

    ...mapMutations(["setRoles"]),

    async update() {
      await this.initialize();
      const response = await this.apiRequest(this.link("GET", "roles"));
      this.setRoles({ roles: response.roles });
      this.rolesLinks = response.links;
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
