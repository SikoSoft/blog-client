<template>
  <div class="blog-comment" :class="classes">
    <div class="blog-comment__avatar">
      <div class="blog-comment__avatar-image"></div>
    </div>
    <div class="blog-comment__body">
      <div class="blog-comment__meta">
        <span class="blog-comment__author">{{ name }}</span>
        <span class="blog-comment__time">{{ postDate }}</span>
        <input class="blog-comment__checkbox" type="checkbox" :value="id" @change="select" />
      </div>
      <div class="blog-comment__message" v-html="renderedMessage"></div>
    </div>
  </div>
</template>

<script>
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { longDate } from "../util/time.js";
import { mapActions } from "vuex";

export default {
  name: "blog-comment",

  props: ["entry_id", "id", "message", "name", "time", "public"],

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
    },

    isSelected() {
      return this.$store.getters.commentIsSelected(this.id);
    },

    classes() {
      return {
        "blog-comment--selected": this.isSelected,
        "blog-comment--needs-approval": this.public === 0
      };
    }
  },

  methods: {
    ...mapActions(["toggleComment"]),

    select() {
      this.toggleComment(this.id);
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.blog-comment {
  margin: $space-xlarge 0;
  display: flex;

  &--selected {
  }

  &--needs-approval {
    opacity: 0.5;
  }

  &__avatar {
    margin-right: $space;
  }

  &__avatar-image {
    width: 5rem;
    height: 5rem;
    border: 1px #222 solid;
    border-radius: $space-xsmall;
  }

  &__body {
    border: 1px #333 solid;
    border-radius: 4px;
    flex-grow: 10;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: -10px;
      top: 10px;
      border-right: 10px solid #333;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }

    &::after {
      content: "";
      position: absolute;
      left: -8px;
      top: 12px;
      border-right: 8px solid #222;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    }
  }

  &__message {
    padding: $space-small;

    p {
      margin: 0;
    }
  }

  &__meta {
    color: $color-text-subtle;
    background-color: #222;
    padding: $space-small;
    border-bottom: 1px #333 solid;
    position: relative;
  }

  &__author {
    font-weight: bold;
    font-size: $font;
  }

  &__time {
    font-size: $font-small;
    vertical-align: text-bottom;
    padding-left: $space;
  }

  &__checkbox {
    position: absolute;
    top: $space-small;
    right: $space-small;
  }
}
</style>
