<template>
  <div class="admin-settings">
    <div
      class="admin-settings__group"
      v-for="(groupSettings, groupName) in settings"
      :key="groupName"
    >
      <h3>{{ groupName }}</h3>
      <ul class="admin-settings__list">
        <div class="admin-settings__setting" v-for="setting in groupSettings" :key="setting.id">
          <admin-setting :bind="setting" :value="settings[setting.id]" />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import settings from "@/data/settings.json";

export default {
  name: "admin-settings",

  data() {
    return {
      settings
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
