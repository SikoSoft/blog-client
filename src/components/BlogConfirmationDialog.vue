<template>
  <div
    class="blog-confirmation-dialog"
    :class="{ 'blog-confirmation-dialog--open': isOpen }"
  >
    <h3 class="blog-confirmation-dialog__title">{{ title }}</h3>
    <div class="blog-confirmation-dialog__message">{{ message }}</div>
    <div class="blog-confirmation-dialog__buttons">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "blog-confirmation-dialog",

  props: {
    title: { type: String },
    message: { type: String },
    isOpen: { type: Boolean }
  },

  methods: {
    ...mapMutations(["setOverlayIsOpen"])
  },

  watch: {
    isOpen(value) {
      this.setOverlayIsOpen({ isOpen: value });
    }
  },

  destroyed() {
    this.setOverlayIsOpen({ isOpen: false });
  }
};
</script>

<style lang="scss" scoped>
@import "@theme/variables";

.blog-confirmation-dialog {
  pointer-events: none;
  opacity: 0;
  transform: scale(0);
  position: fixed;
  z-index: 1001;
  top: 20vh;
  left: 20vw;
  width: 60vw;
  height: 30vh;
  min-height: 250px;
  border-radius: 8px;
  padding: $space-large;
  box-sizing: border-box;
  background-color: $color-modal-bg;
  border: 1px $color-primary-border solid;
  box-shadow: 0 0 10px 10px $color-box-shadow;
  transition: all 0.3s;

  &--open {
    pointer-events: all;
    opacity: 1;
    transform: scale(1);
  }

  .blog-confirmation-dialog__title {
    margin: 2vh 0;
    font-size: $font-xlarge;
    color: $color-emphasis;
  }

  .blog-confirmation-dialog__message {
    font-size: $font-large;
    color: $color-text-main;
  }

  .blog-confirmation-dialog__buttons {
    padding: $space-large;
    text-align: center;

    button {
      margin: $space;
    }
  }
}
</style>
