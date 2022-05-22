<template>
  <div class="admin-setting">
    <div class="admin-setting__label">{{ label }}</div>
    <div class="admin-setting__input">
      <template v-if="type === 'list'">
        <blog-role-selector v-model="value" v-if="listSource === 'roles'" />
        <blog-banner-selector v-model="value" v-if="listSource === 'banners'" />
      </template>
      <template v-if="type === 'number'">
        <input
          type="text"
          class="admin-setting__input-number"
          :maxlength="maxLength ? maxLength : ''"
          v-model="value"
        />
      </template>
      <template v-if="type === 'text'">
        <input type="text" class="admin-setting__input-text" v-model="value" />
      </template>
      <template v-if="type === 'toggle'">
        <blog-toggle v-model="value" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BlogRoleSelector from "@/components/BlogRoleSelector";
import BlogBannerSelector from "@/components/BlogBannerSelector";
import BlogToggle from "@/components/BlogToggle";

export default {
  name: "admin-setting",

  props: {
    id: { type: String, default: "" },
    label: { type: String, default: "" },
    type: {
      type: String,
      default: "toggle"
    },
    listSource: { type: String, default: "" },
    maxLength: { type: Number, default: 3 },
    initialValue: { type: [String, Number, Boolean] },
    links: Array
  },

  components: { BlogRoleSelector, BlogBannerSelector, BlogToggle },

  data() {
    return {
      value: this.initialValue ? this.initialValue : 0
    };
  },

  computed: {
    ...mapGetters({ listOptions: "settingListOptions" })
  },

  methods: {
    ...mapActions(["setSetting"]),

    handleChange() {
      const payload = { links: this.links, id: this.id, value: this.value };
      this.setSetting(payload);
    }
  },

  watch: {
    value() {
      this.handleChange();
    }
  }
};
</script>

<style lang="scss" scoped>
.admin-setting {
  margin: 1.5rem 0;

  &__label {
    margin: 0.5rem 0;
  }

  &__input {
    &-text {
      width: 80vw;
    }
  }
}
</style>
