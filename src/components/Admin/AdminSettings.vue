<template>
  <div class="admin-settings">
    <div
      class="admin-settings__group"
      v-for="(groupSettings, groupName) in settings"
      :key="groupName"
    >
      <h3>{{ groupName }}</h3>
      <table class="admin-settings__table">
        <tr class="admin-settings__table-row" v-for="setting in groupSettings">
          <td class="admin-settings__table-column">{{ setting.label }}</td>
          <td class="admin-settings__table-column"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import settings from "@/data/settings.json";

export default {
  name: "admin-settings",

  data() {
    return {
      settings
    };
  }
};
</script>

<style lang="scss" scoped>
.admin-settings {
  &__group {
  }

  &__group-name {
  }

  &__table {
  }

  &__table-row {
  }

  &__table-column {
  }
}
</style>
