<template>
  <div :id="`comment-${id}`" class="blog-comment" :class="classes">
    <div class="blog-comment__avatar">
      <div class="blog-comment__avatar-image"></div>
    </div>
    <div class="blog-comment__body">
      <div class="blog-comment__meta">
        <span class="blog-comment__author">{{ name }}</span>
        <span class="blog-comment__time">{{ postDate }}</span>
        <input
          v-if="showCheckBox"
          class="blog-comment__checkbox"
          type="checkbox"
          :value="id"
          :checked="isSelected"
          @change="select"
        />
      </div>
      <div class="blog-comment__message" v-html="renderedMessage"></div>
    </div>
  </div>
</template>

<script>
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { mapActions, mapState } from "vuex";
import { longDate } from "../util/time.js";
import { parseVars } from "@/util/strings.js";
import linkHandlers from "@/shared/linkHandlers.js";

export default {
  name: "blog-comment",

  props: {
    entry_id: { type: String },
    id: { type: Number },
    message: { type: String },
    name: { type: String },
    time: { type: Number },
    public: { type: Number },
    links: { type: Array }
  },

  computed: {
    ...mapState(["user"]),

    renderedMessage() {
      return new QuillDeltaToHtmlConverter(
        JSON.parse(this.message),
        {}
      ).convert();
    },

    postDate() {
      return parseVars(this.$strings.postedFullDate, {
        date: longDate(this.time * 1000)
      });
    },

    isSelected() {
      return this.$store.getters.commentIsSelected(this.id);
    },

    classes() {
      return {
        "blog-comment--selected": this.isSelected,
        "blog-comment--needs-approval": this.public === 0
      };
    },

    showCheckBox() {
      if ((this.link("PUT") && this.public === 0) || this.link("DELETE")) {
        return true;
      }
      return false;
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["toggleComment"]),

    select() {
      this.toggleComment(this.id);
    }
  }
};
</script>

<style lang="scss">
@import "@theme/variables";

.blog-comment {
  margin: $space-xlarge 0;
  display: flex;

  &--needs-approval {
    opacity: 0.5;
  }

  &__avatar {
    margin-right: $space;
  }

  &__avatar-image {
    width: 5rem;
    height: 5rem;
    border: 1px $color-border-secondary solid;
    border-radius: $space-xsmall;
  }

  &__body {
    border: 1px $color-border-secondary solid;
    border-radius: 4px;
    flex-grow: 10;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: -10px;
      top: 10px;
      border-right: 10px solid $color-border-secondary;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }

    &::after {
      content: "";
      position: absolute;
      left: -8px;
      top: 12px;
      border-right: 8px solid $color-border-secondary;
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
    background-color: $color-bg-secondary;
    padding: $space-small;
    border-bottom: 1px $color-border-secondary solid;
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
