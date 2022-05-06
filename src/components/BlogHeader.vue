<template>
  <div class="blog-header">
    <blog-hero />
    <blog-breadcrumb id="blog-breadcrumb" />
  </div>
</template>

<script>
import BlogHero from "@/components/BlogHero.vue";
import BlogBreadcrumb from "@/components/BlogBreadcrumb.vue";

export default {
  name: "blog-header",

  components: { BlogHero, BlogBreadcrumb }
};
</script>

<style lang="scss"></style>
