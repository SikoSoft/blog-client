<template>
  <div class="blog-comment">
    <div class="blog-comment__body">
      <div class="blog-comment__meta">{{ postDate }}</div>
      <div class="blog-comment__message" v-html="renderedMessage"></div>
    </div>
  </div>
</template>

<script>
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { longDate } from "../util/time.js";

export default {
  name: "blog-comment",

  props: ["entry_id", "id", "message", "name", "time"],

  computed: {
    renderedMessage() {
      return new QuillDeltaToHtmlConverter(
        JSON.parse(this.message),
        {}
      ).convert();
    },

    postDate() {
      return this.$strings.postedFullDate.replace(
        "{date}",
        longDate(this.time * 1000)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.blog-comment {
  margin: $space-xlarge 0;

  &__message {
  }

  &__meta {
    color: $color-text-subtle;
  }
}
</style>
