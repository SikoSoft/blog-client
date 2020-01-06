<template>
  <div class="blog-header">
    <blog-admin v-if="user.role === 1" />
    <blog-breadcrumb />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import BlogAdmin from "@/components/BlogAdmin.vue";
import BlogBreadcrumb from "@/components/BlogBreadcrumb.vue";

export default {
  name: "blog-header",

  components: { BlogAdmin, BlogBreadcrumb },

  computed: mapGetters(["user"])
};
</script>

<style lang="scss"></style>
