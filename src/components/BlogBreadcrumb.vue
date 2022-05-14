<template>
  <nav class="blog-breadcrumb">
    <div class="blog-breadcrumb__inner">
      <ul class="blog-breadcrumb__list">
        <li
          v-for="(link, index) in links"
          class="blog-breadcrumb__list-item"
          :key="`${link.label}-item`"
        >
          <div
            v-if="index > 0"
            class="blog-breadcrumb__list-arrow"
            :key="`${link.label}-arrow`"
          ></div>
          <router-link
            class="blog-breadcrumb__list-item-link"
            :class="{
              'blog-breadcrumb__list-item-link--disabled': !!!link.href
            }"
            :to="link.href"
            >{{ link.label }}</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "blog-breadcrumb",

  computed: {
    ...mapState(["breadcrumbs"]),

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
@import "@/styles/mixins";

$height: 6rem;

.blog-breadcrumb {
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
  border-top: 2px $color-border-primary solid;
  border-bottom: 2px $color-border-primary solid;

  .blog-breadcrumb__inner {
    @include container-width;
  }

  .blog-breadcrumb__list {
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: $height;
  }

  .blog-breadcrumb__list-item {
    display: inline-block;
    height: $height;
    line-height: $height;

    &:not(:first-child) {
      margin-left: $space;
    }
  }

  .blog-breadcrumb__list-item-link {
    display: inline-block;
    height: $height;
    &--disabled {
      color: rgba(255, 255, 255, 0.75);
      cursor: text;
    }
  }

  .blog-breadcrumb__list-arrow {
    float: left;
    margin-right: 4rem;
    position: relative;
    top: 1.5rem;
    width: ($height * 0.25);
    height: ($height * 0.25);
    border: 0.75rem solid;
    border-color: rgba(119, 119, 119, 0.5) transparent transparent
      rgba(119, 119, 119, 0.5);
    transform: rotate(135deg);
  }
}
</style>
