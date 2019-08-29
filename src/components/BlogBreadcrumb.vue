<template>
  <nav class="blog-breadcrumb">
    <ul class="blog-breadcrumb__list">
      <li class="blog-breadcrumb__list-item" v-for="link in links" :key="link.name">
        <a class="blog-breadcrumb__list-item-link" :href="link.href">{{ link.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "blog-breadcrumb",

  computed: {
    links() {
      return [{ href: "/", name: this.$config.siteName }];
    }
  }
};
</script>

<style lang="sass" scoped>

</style>