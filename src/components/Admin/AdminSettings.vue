<template>
  <div class="admin-settings">
    <div
      class="admin-settings__group"
      v-for="settingGroup in Object.keys(settingGroups)"
      :key="settingGroup"
    >
      <h3>{{ $strings.settingsGroups[settingGroup] }}</h3>
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import spec from "blog-spec";
import AdminSetting from "@/components/Admin/AdminSetting.vue";

const settingGroups = {
  roles: ["role_admin", "role_guest"],
  ui: ["toast_life", "show_powered_by", "footer_body"],
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

  components: { AdminSetting },

  data() {
    return {
      settingGroups,
      spec
    };
  },

  computed: {
    ...mapGetters(["settings"])
  },

  methods: {
    settingById(id) {
      const match = this.spec.settings.filter(setting => setting.id === id);
      if (match.length) {
        const setting = match[0];
        if (this.$strings.settingsLabels[id]) {
          setting.label = this.$strings.settingsLabels[id];
        }
        return setting;
      }
      return false;
    }
  }
};
</script>
