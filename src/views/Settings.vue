<template>
  <div class="settings">
    <admin-settings />
  </div>
</template>

<script>
import { mapActions } from "vuex";
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

  computed: {},

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
  }
};
</script>
