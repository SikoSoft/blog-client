<template>
  <div class="settings">
    <admin-settings
      v-if="contextIsReady(context)"
      v-bind="settings"
      :settingsConfig="settingsConfig"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
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
      context: { id: "view", props: ["settings"] },
      firstUpdate: true
    };
  },

  created() {
    this.addContext(this.context);
  },

  async mounted() {
    //await this.addContext();
    this.update();
  },

  async unmounted() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["initialized", "user", "settings", "settingsConfig"]),

    ...mapGetters(["contextIsReady"])
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
