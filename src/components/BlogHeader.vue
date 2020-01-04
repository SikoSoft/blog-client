<template>
  <div class="blog-header">
    <blog-admin />
    <blog-breadcrumb />
  </div>
</template>

<script>
import BlogAdmin from "@/components/BlogAdmin.vue";
import BlogBreadcrumb from "@/components/BlogBreadcrumb.vue";

export default {
  name: "blog-header",

  components: { BlogAdmin, BlogBreadcrumb }
};
</script>

<style lang="scss">
</style>