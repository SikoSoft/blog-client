<template>
  <nav class="blog-breadcrumb">
    <ul class="blog-breadcrumb__list">
      <template v-for="(link, index) in links">
        <li class="blog-breadcrumb__list-item" :key="`${link.label}-item`">
          <div v-if="index > 0" class="blog-breadcrumb__list-arrow" :key="`${link.label}-arrow`"></div>
          <router-link
            class="blog-breadcrumb__list-item-link"
            :class="{
              'blog-breadcrumb__list-item-link--disabled': !!!link.href
            }"
            :to="link.href"
          >{{ link.label }}</router-link>
        </li>
      </template>
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
        { href: "/", label: process.env.VUE_APP_SITE_NAME },
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
  padding-left: $space-xlarge;
  background: linear-gradient(
    to bottom,
    $color-bg-secondary-highlight,
    5%,
    $color-bg-secondary,
    95%,
    $color-bg-secondary-highlight
  );
  font-size: 2rem;
  white-space: nowrap;

  .blog-breadcrumb__list {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 8rem;
  }

  .blog-breadcrumb__list-item {
    display: inline-block;
    height: 8rem;
    line-height: 8rem;

    &:not(:first-child) {
      margin-left: $space;
    }
  }

  .blog-breadcrumb__list-item-link {
    display: inline-block;
    height: 8rem;
    &--disabled {
      color: rgba(255, 255, 255, 0.75);
      cursor: text;
    }
  }

  .blog-breadcrumb__list-arrow {
    float: left;
    margin-right: 4rem;
    position: relative;
    top: 1rem;
    width: 4rem;
    height: 4rem;
    border: 1rem solid;
    border-color: #777 transparent transparent #777;
    transform: rotate(135deg);
  }
}
</style>
