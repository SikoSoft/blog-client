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
  z-index: 1;
  top: 20vh;
  left: 20vw;
  width: 60vw;
  height: 30vh;
  min-height: 250px;
  border-radius: 8px;
  padding: $space-large;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px $color-border-primary solid;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.5);

  &--open {
    display: block;
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
