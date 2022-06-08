<template>
  <div class="blog-type-input">
    <div class="blog-type-input__label">{{ label }}</div>
    <div class="blog-type-input__input">
      <template v-if="type === 'list'">
        <blog-role-selector v-model="value" v-if="listSource === 'roles'" />
        <blog-banner-selector v-model="value" v-if="listSource === 'banners'" />
        <blog-block-selector v-model="value" v-if="listSource === 'blocks'" />
      </template>
      <template v-if="type === 'number'">
        <input
          type="text"
          class="blog-type-input__input-number"
          :maxlength="maxLength ? maxLength : ''"
          v-model="value"
        />
      </template>
      <template v-if="type === 'text'">
        <input
          type="text"
          class="blog-type-input__input-text"
          v-model="value"
        />
      </template>
      <template v-if="type === 'toggle'">
        <blog-toggle v-model="value" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BlogRoleSelector from "@/components/BlogRoleSelector";
import BlogBannerSelector from "@/components/BlogBannerSelector";
import BlogBlockSelector from "@/components/BlogBlockSelector";
import BlogToggle from "@/components/BlogToggle";

export default {
  name: "blog-type-input",

  props: {
    id: { type: String, default: "" },
    label: { type: String, default: "" },
    type: {
      type: String,
      default: ""
    },
    listSource: { type: String, default: "" },
    maxLength: { type: Number, default: 3 },
    initialValue: { type: [String, Number, Boolean] },
    links: Array
  },

  components: {
    BlogRoleSelector,
    BlogBannerSelector,
    BlogBlockSelector,
    BlogToggle
  },

  data() {
    return {
      value: this.initialValue ? this.initialValue : 0
    };
  },

  computed: {
    ...mapGetters({ listOptions: "settingListOptions" })
  },

  watch: {
    value(newValue) {
      this.$emit("change", newValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-type-input {
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
