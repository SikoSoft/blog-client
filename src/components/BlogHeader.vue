<template>
  <div class="blog-header">
    <blog-banner
      :title="header.title"
      :caption="header.caption"
      :image="header.image"
    />
    <blog-breadcrumb id="blog-breadcrumb" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import BlogBanner from "@/components/BlogBanner";
import BlogBreadcrumb from "@/components/BlogBreadcrumb";

export default {
  name: "blog-header",

  components: { BlogBanner, BlogBreadcrumb },

  computed: {
    ...mapState(["header"])
  }
};
</script>

<style lang="scss">
@import "@/styles/variables";

.blog-header {
  background-color: #000;
}
</style>
