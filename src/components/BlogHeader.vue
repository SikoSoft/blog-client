<template>
  <div class="blog-header">
    <blog-hero />
    <blog-breadcrumb id="blog-breadcrumb" />
  </div>
</template>

<script>
import BlogHero from "@/components/BlogHero";
import BlogBreadcrumb from "@/components/BlogBreadcrumb";

export default {
  name: "blog-header",

  components: { BlogHero, BlogBreadcrumb }
};
</script>

<style lang="scss">
@import "@/styles/variables";

.blog-header {
  background-color: #000;
}
</style>
