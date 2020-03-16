<template>
  <button class="blog-button" :class="classes" @click.prevent="action">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "blog-button",

  props: {
    text: {
      type: String
    },
    action: {
      type: Function,
      default: () => {}
    },
    create: {
      type: Boolean
    },
    destroy: {
      type: Boolean
    }
  },

  computed: {
    classes() {
      return {
        "blog-button--disabled": this.disabled,
        "blog-button--create": this.create,
        "blog-button--destroy": this.destroy
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.blog-button {
  &--disabled {
    opacity: 0.6;
  }

  &--create {
    color: $color-action-create-text;
    background-color: $color-action-create-bg;
  }

  &--destroy {
    color: $color-action-destroy-text;
    background-color: $color-action-destroy-bg;
  }
}
</style>
