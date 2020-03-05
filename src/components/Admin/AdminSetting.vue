<template>
  <div class="admin-setting">
    <div class="admin-setting__label">{{ label }}</div>
    <div class="admin-setting__input">
      <template v-if="type === 'number'">
        <input type="text" class="admin-setting__input-number" />
      </template>
      <template v-if="type === 'text'">
        <input type="text" class="admin-setting__input-text" />
      </template>
      <template v-if="type === 'toggle'">
        <blog-toggle v-model="value" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "admin-setting",

  props: {
    id: { type: Number, default: -1 },
    label: { type: String, default: "" },
    type: {
      type: String,
      default: "toggle"
    },
    maxLength: { type: Number, default: 3 },
    initialValue: { type: [String, Number, Boolean] }
  },

  data() {
    return {
      value: this.props.initialValue ? this.props.initialValue : ""
    };
  },

  methods: {
    ...mapActions(["setSetting"]),

    handleChange() {
      this.setSetting({ id: this.id, value: this.value });
    }
  }
};
</script>

<style lang="scss" scoped></style>
