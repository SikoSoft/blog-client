<template>
  <div class="blog-entry" :class="{ 'blog-entry--full': fullMode }">
    <h3
      class="blog-entry__title"
      :class="{ 'blog-entry__title--clickable': !fullMode }"
    >
      <router-link :to="`/entry/${id}`" v-if="!fullMode">{{
        title
      }}</router-link>
      <template v-else>{{ title }}</template>
    </h3>
    <div class="blog-entry__meta">
      <div class="blog-entry__posted-time">{{ postedTime }}</div>
    </div>
    <div class="blog-entry__body">
      <div class="body-entry__body-content" v-html="renderedBody"></div>
      <div class="blog-entry__body-more">
        <router-link :to="`/entry/${id}`" v-if="!fullMode">{{
          $strings.readMore
        }}</router-link>
      </div>
    </div>
    <div class="blog-entry__foot">
      <div class="blog-entry__tags" v-if="tags">
        <ul>
          <li class="blog-entry__tag" v-for="tag in tags" :key="tag">
            <router-link :to="`/tag/${tag}`">{{ tag }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { longDate } from "../util/time.js";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default {
  name: "blog-entry",

  props: ["id", "title", "body", "tags", "created", "fullMode"],

  computed: {
    foot() {
      return "Footer";
    },

    postedTime() {
      return this.$strings.postedFullDate.replace(
        "{date}",
        longDate(this.created * 1000)
      );
    },

    hasAccess() {},

    renderedBody() {
      return new QuillDeltaToHtmlConverter(this.body, {}).convert();
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.blog-entry {
  margin: 50px 0;

  &--full &__posted-time {
    border-top: 1px $color-text-subtle solid;
  }

  &__posted-time {
    color: $color-text-subtle;
    border-top: 1px $color-link-primary solid;
    padding-top: 5px;
    display: inline-block;
  }

  &__title {
    margin: 0;
    border-left: 5px $color-text-subtle solid;
    padding: 5px 10px;
    color: $color-text-headline;
    font-size: 48px;

    &--clickable {
      border-left: 5px $color-link-primary solid;
    }
  }

  &__body {
    padding: 36px 8px 36px 16px;

    &-more {
      margin-top: 10px;
    }
  }

  &__foot {
  }

  &__tags {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  &__tag {
    display: inline-block;
    text-transform: uppercase;

    &:not(:first-child) {
      margin-left: $space;
    }
  }
}
</style>
