<template>
  <div class="admin-settings">
    <div
      class="admin-settings__group"
      v-for="(groupSettings, groupName) in settingsManifest"
      :key="groupName"
    >
      <h3>{{ groupName }}</h3>
      <ul class="admin-settings__list">
        <div class="admin-settings__setting" v-for="setting in groupSettings" :key="setting.id">
          <admin-setting
            v-bind="setting"
            :initialValue="settings[setting.id] ? settings[setting.id] : null"
          />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AdminSetting from "@/components/Admin/AdminSetting.vue";

import settingsManifest from "@/data/settings.json";

export default {
  name: "admin-settings",

  components: { AdminSetting },

  data() {
    return {
      settingsManifest
    };
  },

  computed: {
    ...mapGetters(["settings"])
  }
};
</script>

<style lang="scss" scoped>
.admin-settings {
  &__group {
  }

  &__group-name {
  }

  &__list {
  }

  &__setting {
  }
}
</style>
