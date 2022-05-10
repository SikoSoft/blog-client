<template>
  <section class="blog-tab" :class="{ 'blog-tab--active': isActive }">
    <slot />
  </section>
</template>

<script>
export default {
  name: "blog-tab",

  props: {
    title: {
      type: String
    }
  },

  data() {
    return {
      isActive: false
    };
  }
};
</script>

<style lang="scss">
.blog-tab {
  height: 0;
  overflow: hidden;
  transition: all 0.3s;

  &--active {
    height: auto;
  }
}
</style>
