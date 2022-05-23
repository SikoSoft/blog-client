<template>
  <div class="blog-tag">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "blog-tag",

  props: { tag: { type: String } },

  computed: mapState(["title"])
};
</script>
