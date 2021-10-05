<template>
  <div class="roles">
    <admin-tag-rights v-if="initialized" v-bind="roles" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AdminTagRights from "@/components/Admin/AdminTagRights.vue";

export default {
  name: "roles",

  components: { AdminTagRights },

  mounted() {
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    ...mapGetters(["initialized", "user"]),

    roles() {
      return this.$store.getters.roles;
    }
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle"]),

    update() {
      this.initialize().then(() => {
        this.setBreadcrumbs([
          { href: "/admin", label: this.$strings.admin },
          { href: "/admin/roles", label: this.$strings.roles }
        ]);
        this.setTitle(this.$strings.roles);
      });
    }
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_roles")) {
        this.$router.push({ path: "/accessDenied" });
      }
    }
  }
};
</script>
