<template>
  <div class="blog-confirmation-dialog" :class="{ 'blog-confirmation-dialog--open': isOpen }">
    <h3 class="blog-confirmation-dialog__title">{{ title }}</h3>
    <div class="blog-confirmation-dialog__message">{{ message }}</div>
    <div class="blog-confirmation-dialog__buttons">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "blog-confirmation-dialog",

  props: ["title", "message", "isOpen"]
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.blog-confirmation-dialog {
  display: none;
  position: fixed;
  width: 30vw;
  height: 30vh;
  border-radius: 8px;

  &--open {
    display: block;
  }

  .blog-confirmation-dialog__title {
    font-size: $font-large;
    color: $color-emphasis;
  }

  .blog-confirmation-dialog__message {
    font-size: $font;
    color: $color-text-main;
  }

  .blog-confirmation-dialog__buttons {
    padding: $space-large;
    text-align: center;
  }
}
</style>
