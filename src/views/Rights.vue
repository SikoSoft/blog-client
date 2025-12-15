<template>
  <div class="rights">
    <admin-rights
      v-if="initialized && contextIsReady(context)"
      :role="role"
      :links="rightsLinks"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import AdminRights from "@/components/Admin/Rights/Rights";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "rights",

  components: { AdminRights },

  props: {
    links: Array
  },

  data() {
    return {
      context: { id: "view", props: ["roleRights"] },
      isUpdating: false,
      firstUpdate: true,
      rightsLinks: []
    };
  },

  mounted() {
    this.addContext(this.context);
    this.update();
  },

  updated() {
    this.update();
  },

  beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["roleRights", "initialized", "user"]),

    ...mapGetters(["contextIsReady"]),

    role() {
      return parseInt(this.$route.params.role);
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "getRoleRights",
      "addContext",
      "removeContext"
    ]),

    async update() {
      await this.initialize();
      if (this.firstUpdate && this.contextIsReady(this.context)) {
        this.firstUpdate = false;
        this.setBreadcrumbs([
          { href: "/admin", label: this.$strings.admin },
          { href: "/admin/rights", label: this.$strings.rights }
        ]);
        this.setTitle(this.$strings.rights);
        const response = await this.getRoleRights({ links: this.links });
        this.rightsLinks = response.links;
      }
    }
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_rights")) {
        this.$router.push({ path: "/access_denied" });
      }
    }
  }
};
</script>
