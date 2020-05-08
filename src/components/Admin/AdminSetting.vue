<template>
  <div class="admin-setting">
    <div class="admin-setting__label">{{ label }}</div>
    <div class="admin-setting__input">
      <template v-if="type === 'number'">
        <input
          type="text"
          class="admin-setting__input-number"
          v-model="value"
        />
      </template>
      <template v-if="type === 'text'">
        <input type="text" class="admin-setting__input-text" v-model="value" />
      </template>
      <template v-if="type === 'toggle'">
        <blog-toggle :isOn="value" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import BlogToggle from "@/components/BlogToggle.vue";

export default {
  name: "admin-setting",

  props: {
    id: { type: String, default: "" },
    label: { type: String, default: "" },
    type: {
      type: String,
      default: "toggle"
    },
    maxLength: { type: Number, default: 3 },
    initialValue: { type: [String, Number, Boolean] }
  },

  components: { BlogToggle },

  data() {
    return {
      value: this.initialValue ? this.initialValue : ""
    };
  },

  methods: {
    ...mapActions(["setSetting"]),

    handleChange() {
      this.setSetting({ id: this.id, value: this.value });
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
