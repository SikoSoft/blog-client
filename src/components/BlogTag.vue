<template>
  <div class="blog-tag">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
import BlogEntry from "@/components/BlogEntry.vue";

export default {
  name: "blog-tag",

  props: ["tag"],

  components: { BlogEntry },

  data() {
    return {
      title: this.$strings.entriesWithTag.replace("{tag}", this.tag)
    };
  }
};
</script>