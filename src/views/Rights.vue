<template>
  <div class="rights">
    <admin-rights v-if="initialized && roleRights" :role="role" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import AdminRights from "@/components/Admin/AdminRights.vue";

export default {
  name: "rights",

  components: { AdminRights },

  mounted() {
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    ...mapState(["roleRights"]),

    ...mapGetters(["initialized", "user"]),

    role() {
      return parseInt(this.$route.params.role);
    },
  },

  methods: {
    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "getRoleRights",
    ]),

    update() {
      this.initialize().then(() => {
        this.setBreadcrumbs([
          { href: "/admin", label: this.$strings.admin },
          { href: "/admin/rights", label: this.$strings.rights },
        ]);
        this.setTitle(this.$strings.rights);
        this.getRoleRights();
      });
    },
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_rights")) {
        this.$router.push({ path: "/access_denied" });
      }
    },
  },
};
</script>
