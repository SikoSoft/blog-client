<template>
  <nav class="blog-breadcrumb">
    <ul class="blog-breadcrumb__list">
      <li class="blog-breadcrumb__list-item" v-for="link in links" :key="link.label">
        <a class="blog-breadcrumb__list-item-link" :href="link.href">{{ link.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "blog-breadcrumb",

  computed: {
    ...mapGetters(["breadcrumbs"]),

    links() {
      return [{ href: "/", label: this.$config.siteName }, ...this.breadcrumbs];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.blog-breadcrumb {
  .blog-breadcrumb__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .blog-breadcrumb__list-item {
    &:not(:first-child) {
      margin-left: $space;
    }
  }

  .blog-breadcrumb__list-item-link {
  }
}
</style>