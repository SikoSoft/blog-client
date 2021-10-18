<template>
  <h1 class="blog-title">{{ title }}</h1>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "blog-title",

  computed: {
    ...mapGetters(["title"])
  }
};
</script>

<style lang="scss">
.blog-title {
}
</style>
