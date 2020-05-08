<template>
  <div class="settings">
    <admin-settings v-if="initialized" v-bind="settings" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AdminSettings from "@/components/Admin/AdminSettings.vue";

export default {
  name: "settings",

  components: { AdminSettings },

  mounted() {
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    ...mapGetters(["initialized", "user"]),

    settings() {
      return this.$store.getters.settings;
    }
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle"]),

    update() {
      this.initialize().then(() => {
        this.setBreadcrumbs([
          { href: "/admin", label: this.$strings.admin },
          { href: "/admin/settings", label: this.$strings.settings }
        ]);
        this.setTitle(this.$strings.settings);
      });
    }
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_settings")) {
        this.$router.push({ path: "/accessDenied" });
      }
    }
  }
};
</script>
