<template>
  <nav class="blog-breadcrumb">
    <ul class="blog-breadcrumb__list">
      <li
        class="blog-breadcrumb__list-item"
        v-for="link in links"
        :key="link.label"
      >
        <router-link
          class="blog-breadcrumb__list-item-link"
          :class="{ 'blog-breadcrumb__list-item-link--disabled': !!!link.href }"
          :to="link.href"
          >{{ link.label }}</router-link
        >
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
      return [
        { href: "/", label: this.$config.siteName },
        ...this.breadcrumbs
      ].map(crumb => ({
        ...crumb,
        href: crumb.href !== this.$route.path ? crumb.href : ""
      }));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.blog-breadcrumb {
  padding: $space-xlarge;
  background-color: $color-bg-secondary;
  font-size: 2rem;

  .blog-breadcrumb__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .blog-breadcrumb__list-item {
    display: inline-block;

    &:not(:first-child) {
      margin-left: $space;

      &:before {
        content: "\0203A";
        margin: 0 $space;
      }
    }
  }

  .blog-breadcrumb__list-item-link {
    &--disabled {
      color: #fff;
      cursor: text;
    }
  }
}
</style>
