<template>
  <div class="blog-entry" :class="{ 'blog-entry--full': fullMode }">
    <template v-if="!editMode">
      <h3 class="blog-entry__title" :class="{ 'blog-entry__title--clickable': !fullMode }">
        <router-link :to="`/entry/${id}`" v-if="!fullMode">{{ title }}</router-link>
        <template v-else>{{ title }}</template>
      </h3>
      <div class="blog-entry__meta">
        <div class="blog-entry__posted-time">{{ postedTime }}</div>
        <div class="blog-entry__edit" v-if="rights.includes('u')">
          <button @click="edit">{{ $strings.editEntry }}</button>
        </div>
      </div>
      <div class="blog-entry__body">
        <div class="body-entry__body-content" v-html="renderedBody"></div>
        <div class="blog-entry__body-more">
          <router-link :to="`/entry/${id}`" v-if="!fullMode">{{ $strings.readMore }}</router-link>
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
    </template>
    <template v-else>
      <button @click="edit">{{ $strings.cancel }}</button>
      <blog-entry-form :entry="entry" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BlogEntryForm from "@/components/BlogEntryForm.vue";
import { longDate } from "../util/time.js";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default {
  name: "blog-entry",

  props: [
    "id",
    "title",
    "body",
    "tags",
    "created",
    "last_edited",
    "api",
    "fullMode"
  ],

  components: { BlogEntryForm },

  data() {
    return {
      editMode: false
    };
  },

  computed: {
    ...mapGetters(["rights"]),

    entry() {
      return {
        id: this.id,
        title: this.title,
        body: this.body,
        tags: this.tags,
        created: this.created,
        last_edited: this.last_edited,
        api: this.api
      };
    },

    foot() {
      return "Footer";
    },

    postedTime() {
      return this.$strings.postedFullDate.replace(
        "{date}",
        longDate(this.created * 1000)
      );
    },

    renderedBody() {
      return new QuillDeltaToHtmlConverter(JSON.parse(this.body), {}).convert();
    }
  },

  methods: {
    edit() {
      this.editMode = !this.editMode;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.blog-entry {
  margin: 4rem 0 12rem 0;

  &--full &__posted-time {
    border-top: 1px $color-text-subtle solid;
  }

  &__meta > div {
    display: inline-block;
  }

  &__posted-time {
    color: $color-text-subtle;
    border-top: 1px $color-link-primary solid;
    padding-top: 5px;
    display: inline-block;
  }

  &__edit {
    button {
      font-size: 14px;
      padding: 2px;
      vertical-align: text-bottom;
      margin-left: 8px;
    }
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

    img {
      max-width: 100%;
    }

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
