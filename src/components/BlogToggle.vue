<template>
  <div class="blog-toggle">
    <div class="blog-toggle__indicator" :class="classes"></div>
  </div>
</template>

<script>
export default {
  name: "blog-toggle",

  props: ["modelValue"],

  computed: {
    isOn: {
      get() {
        return this.modelValue;
      },

      set(val) {
        this.$emit("input", val);
      }
    },

    classes() {
      return {
        "blog-toggle__indicator--on": this.isOn,
        "blog-toggle__indicator--off": !this.isOn
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-toggle {
}
</style>
