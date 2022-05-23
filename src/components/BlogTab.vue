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
  display: none;

  &--active {
    display: block;
  }
}
</style>
