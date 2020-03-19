<template>
  <div class="blog-header">
    <blog-hero />
    <blog-admin v-if="user.rights && user.rights.includes('create_entry')" />
    <blog-breadcrumb id="blog-breadcrumb" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import BlogHero from "@/components/BlogHero.vue";
import BlogAdmin from "@/components/BlogAdmin.vue";
import BlogBreadcrumb from "@/components/BlogBreadcrumb.vue";

export default {
  name: "blog-header",

  components: { BlogHero, BlogAdmin, BlogBreadcrumb },

  computed: mapGetters(["user"])
};
</script>

<style lang="scss"></style>
