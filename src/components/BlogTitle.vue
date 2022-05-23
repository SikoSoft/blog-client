<template>
  <h1 class="blog-title">{{ title }}</h1>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "blog-title",

  computed: {
    ...mapState(["title"])
  }
};
</script>
