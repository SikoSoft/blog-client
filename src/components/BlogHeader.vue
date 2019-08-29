<template>
  <div class="blog-header">
    <blog-breadcrumb />
  </div>
</template>

<script>
import BlogBreadcrumb from "./BlogBreadcrumb.vue";

export default {
  name: "blog-header",

  components: { BlogBreadcrumb }
};
</script>

<style lang="scss">
</style>