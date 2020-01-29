<template>
  <div class="blog-comments">
    <h3 class="blog-comments__head">{{ $strings.comments }}</h3>
    <ul class="blog-comments__list">
      <li class="blog-comments__comment" v-for="comment in comments" :key="comment.id">
        <div class="blog-comments__comment-message" v-html="renderedMessage(comment.message)"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default {
  name: "blog-comments",

  props: ["entry"],

  mounted() {
    this.getComments({ id: this.entry.id });
  },

  computed: {
    comments() {
      return this.$store.state.comments[this.entry.id]
        ? this.$store.state.comments[this.entry.id]
        : [];
    }
  },

  methods: {
    ...mapActions(["getComments"]),

    renderedMessage(message) {
      return new QuillDeltaToHtmlConverter(JSON.parse(message), {}).convert();
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-comments {
  &__head {
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__comment {
    margin: 1rem 0;

    &-message {
    }

    &-meta {
    }
  }
}
</style>
