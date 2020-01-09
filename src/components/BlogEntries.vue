<template>
  <div class="blog-entries">
    <div class="blog-entries__list">
      <blog-entry v-for="entry in entries" :key="entry.id" v-bind="entry" />
    </div>
  </div>
</template>

<script>
import BlogEntry from "@/components/BlogEntry.vue";

export default {
  name: "blog-entries",

  props: ["entries"],

  components: { BlogEntry }
};
</script>

<style lang="scss">
.blog-entries {
  //padding: 10px;
}
</style>
