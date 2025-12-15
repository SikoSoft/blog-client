<template>
  <div
    class="blog-overlay"
    :class="{ 'blog-overlay--open': overlayIsOpen }"
  ></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "blog-overlay",

  computed: {
    ...mapState(["overlayIsOpen"])
  }
};
</script>

<style lang="scss" scoped>
@import "@theme/variables";

.blog-overlay {
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color-overlay-bg;
  pointer-events: none;
  transition: all 0.3s;

  &--open {
    pointer-events: unset;
    opacity: 1;
  }
}
</style>
