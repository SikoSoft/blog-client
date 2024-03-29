<template>
  <div class="admin-settings" v-if="ready">
    <blog-tabs>
      <blog-tab
        v-for="settingGroup in Object.keys(settingGroups).filter(
          settingGroup => settingGroups[settingGroup].length > 0
        )"
        :key="settingGroup"
        :title="$strings.settingsGroups[settingGroup]"
      >
        <ul class="admin-settings__list">
          <div
            class="admin-settings__setting"
            v-for="settingId in settingGroups[settingGroup]"
            :key="settingId"
          >
            <admin-setting
              v-bind="settingById(settingId)"
              :initialValue="settings[settingId] ? settings[settingId] : null"
            />
          </div>
        </ul>
      </blog-tab>
    </blog-tabs>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import spec from "blog-spec";
import BlogTabs from "@/components/BlogTabs";
import BlogTab from "@/components/BlogTab";
import AdminSetting from "@/components/Admin/AdminSetting";

const settingGroups = {
  roles: ["role_admin", "role_guest"],
  ui: ["header_banner", "toast_life", "show_powered_by", "footer_body"],
  entries: [
    "per_load",
    "teaser_mode",
    "auto_entry_url",
    "further_reading_min_tags",
    "further_reading_max"
  ],
  comments: ["enable_comments", "use_captcha", "min_score_auto_publish"],
  sidebar: ["show_sidebar", "github_feed"]
};

settingGroups.other = spec.settings
  .filter(setting => {
    let match = false;
    for (let group of Object.keys(settingGroups)) {
      if (
        settingGroups[group].some(
          settingsInGroup => settingsInGroup.indexOf(setting.id) > -1
        )
      ) {
        match = true;
      }
    }
    return !match;
  })
  .map(setting => setting.id);

export default {
  name: "admin-settings",

  components: { AdminSetting, BlogTabs, BlogTab },

  props: {
    settingsConfig: Array
  },

  data() {
    return {
      settingGroups,
      spec
    };
  },

  async created() {
    await this.addContext({ id: "view", props: ["setting"] });
  },

  computed: {
    ...mapState(["settings"]),

    ...mapGetters(["ready"])
  },

  methods: {
    ...mapActions(["addContext"]),

    settingById(id) {
      const matchConfig = this.settingsConfig.filter(
        setting => setting.id === id
      );
      const matchSpec = this.spec.settings.filter(setting => setting.id === id);
      if (matchSpec.length) {
        const setting = { ...matchSpec[0], ...matchConfig[0] };
        setting.label = this.$strings.settingsLabels[id]
          ? (setting.label = this.$strings.settingsLabels[id])
          : id;
        return setting;
      }
      return false;
    }
  }
};
</script>
