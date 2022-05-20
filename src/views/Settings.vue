<template>
  <div class="settings">
    <admin-settings
      v-if="initialized"
      v-bind="settings"
      :settingsConfig="settingsConfig"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import AdminSettings from "@/components/Admin/AdminSettings";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "settings",

  components: { AdminSettings },

  props: {
    links: Array
  },

  data() {
    return {
      firstUpdate: true
    };
  },

  mounted() {
    this.addContext({ id: "view", props: ["settings"] });
    this.update();
  },

  updated() {
    //this.update();
  },

  computed: {
    ...mapState(["initialized", "user", "settings", "settingsConfig"])
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "addContext",
      "getSettings",
      "apiRequest"
    ]),

    ...mapMutations(["setSettingsConfig"]),

    async update() {
      if (this.firstUpdate) {
        await this.initialize();
        const { settings } = await this.apiRequest(
          this.link("GET", "settings")
        );
        console.log("settingsConfig", settings);
        this.setSettingsConfig({ settings });
        this.setBreadcrumbs([
          { href: "/admin", label: this.$strings.admin },
          { href: "/admin/settings", label: this.$strings.settings }
        ]);
        this.setTitle(this.$strings.settings);
        this.firstUpdate = false;
      }
    }
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_settings")) {
        this.$router.push({ path: "/access_denied" });
      }
    }
  }
};
</script>
