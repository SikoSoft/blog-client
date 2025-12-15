<template>
  <div class="settings">
    <admin-settings
      v-if="ready && settingsConfig.length"
      v-bind="settings"
      :settingsConfig="settingsConfig"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import AdminSettings from "@/components/Admin/Settings/Settings";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "settings",

  components: { AdminSettings },

  props: {
    links: Array
  },

  data() {
    return {
      context: { id: "view", props: ["settings"] },
      firstUpdate: true
    };
  },

  created() {
    this.addContext(this.context);
  },

  async mounted() {
    this.update();
  },

  async updated() {
    this.update();
  },

  beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["initialized", "user", "settings", "settingsConfig"]),

    ...mapGetters(["contextIsReady"]),

    ready() {
      return this.contextIsReady(this.context);
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "addContext",
      "removeContext",
      "getSettings",
      "apiRequest"
    ]),

    ...mapMutations(["setSettingsConfig"]),

    async update() {
      await this.initialize();
      if (this.ready && !this.settingsConfig.length) {
        const { settings } = await this.apiRequest(
          this.link("GET", "settings")
        );
        this.setSettingsConfig({ settings });
        this.setBreadcrumbs([
          { href: "/admin", label: this.$strings.admin },
          { href: "/admin/settings", label: this.$strings.settings }
        ]);
        this.setTitle(this.$strings.settings);
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
