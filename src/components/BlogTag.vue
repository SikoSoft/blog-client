<template>
  <div class="blog-tag">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "blog-tag",

  props: ["tag"],

  computed: mapGetters(["title"])
};
</script>
