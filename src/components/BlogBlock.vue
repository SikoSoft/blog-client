<template>
  <div class="blog-block">
    <blog-context v-slot="{ inContext }" :rules="context" v-if="context">
      <slot v-if="inContext" />
    </blog-context>
    <slot v-else />
  </div>
</template>

<script>
import BlogContext from "@/components/BlogContext";

export default {
  name: "blog-block",

  props: {
    context: { type: Array }
  },

  components: { BlogContext }
};
</script>

<style lang="scss" scoped>
.blog-block {
}
</style>
