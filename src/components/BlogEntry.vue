<template>
  <div class="blog-entry">
    <h3 class="blog-entry__title">
      <router-link :to="`/entry/${id}`" v-if="!fullMode">{{ title }}</router-link>
      <template v-else>{{ title }}</template>
    </h3>
    <div class="blog-entry__meta">
      <div class="blog-entry__posted-time">{{ postedTime }}</div>
    </div>
    <div class="blog-entry__body">
      <div class="body-entry__body-content" v-html="renderedBody"></div>
      <div class="blog-entry__body-more">
        <router-link :to="`/entry/${id}`" v-if="!fullMode">{{ $strings.readMore }}</router-link>
      </div>
    </div>
    <div class="blog-entry__foot">{{ foot }}</div>
  </div>
</template>

<script>
import { longDate } from "../util/time.js";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default {
  name: "blog-entry",

  props: ["id", "title", "body", "created", "fullMode"],

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
      console.log("body", this.body);
      return new QuillDeltaToHtmlConverter(this.body, {}).convert();
    }
  }
};
</script>

<style lang="scss">
.blog-entry {
  margin: 50px 0;

  a {
    color: yellow;
    text-decoration: none;
  }

  &__posted-time {
    color: #888;
  }

  &__title {
    margin: 0;
    border-left: 5px rgb(50, 105, 50) solid;
    padding: 5px 10px;
    //box-shadow: 3px 3px 5px 3px #111;
    color: rgb(87, 173, 87);
    font-size: 36px;
  }

  &__body {
    padding: 20px 10px 20px 15px;

    &-more {
      margin-top: 10px;
    }
  }

  &__foot {
  }
}
</style>