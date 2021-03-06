<template>
  <div
    class="blog-entry"
    :class="{ 'blog-entry--full': fullMode }"
    ref="container"
  >
    <template v-if="!editMode">
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
        <div
          class="blog-entry__edit"
          v-if="user.rights.includes('update_entry')"
        >
          <blog-button :action="edit" :text="$strings.editEntry" />
        </div>
      </div>
      <div class="blog-entry__body">
        <div class="body-entry__body-content">
          <runtime-template-compiler :template="renderedBody" />
        </div>
        <div class="blog-entry__body-more" v-if="!fullMode">
          <router-link :to="`/entry/${id}`">{{
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
      <div class="blog-entry__comments" v-if="showComments">
        <blog-comment-form
          :entry="entry"
          v-if="user.rights.includes('post_comments')"
        />
        <blog-comments @commentsLoaded="commentsLoaded" :entry="entry" />
      </div>
    </template>
    <template v-else>
      <blog-button :action="edit" :text="$strings.cancel" />
      <blog-entry-form
        :initialEntry="entry"
        @idChanged="idChanged"
        @edited="edited"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import BlogEntryForm from "@/components/BlogEntryForm.vue";
import BlogComments from "@/components/BlogComments.vue";
import BlogCommentForm from "@/components/BlogCommentForm.vue";
import BlogButton from "@/components/BlogButton.vue";
import { longDate } from "../util/time.js";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const imgRegExp = new RegExp("<img ", "g");

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
    "public",
    "fullMode"
  ],

  components: {
    BlogEntryForm,
    BlogComments,
    BlogCommentForm,
    BlogButton
  },

  data() {
    return {
      numImages: 0
    };
  },

  computed: {
    ...mapGetters(["user", "settings"]),

    editMode() {
      return this.$store.getters.editMode(this.id);
    },

    entry() {
      return {
        id: this.id,
        title: this.title,
        body: this.body,
        tags: this.tags,
        created: this.created,
        last_edited: this.last_edited,
        api: this.api,
        public: this.public
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
      return (
        "<div>" +
        new QuillDeltaToHtmlConverter(JSON.parse(this.body), {})
          .convert()
          .replace(
            /\B#(\d*[A-Za-z_]+\w*)\b(?!;)/,
            "<a href='/tag/$1' class='vue-route'>#$1</a>"
          )
          .replace(
            imgRegExp,
            `<img @load="() => {imageLoaded({entryId: id})}" @error="() => {imageError({entryId: id})}" `
          ) +
        "</div>"
      );
    },

    showComments() {
      return (
        this.public === 1 &&
        this.fullMode &&
        this.settings.enable_comments === 1
      );
    },

    imagesLoaded() {
      return this.$store.getters.imagesLoaded(this.id);
    }
  },

  methods: {
    ...mapActions(["setEditMode"]),

    ...mapMutations(["imageLoaded"]),

    imageError({ entryId }) {
      this.imageLoaded({ entryId });
    },

    edit() {
      this.setEditMode({ id: this.id, mode: this.editMode ? false : true });
    },

    idChanged() {},

    edited(id) {
      this.$emit("edited", id);
    },

    commentsLoaded() {
      if (this.$route.hash) {
        const commentContainer = document.querySelector(this.$route.hash);
        if (commentContainer) {
          setTimeout(() => {
            window.scrollTo({
              top:
                commentContainer.getBoundingClientRect().top +
                document.documentElement.scrollTop,
              left: window.scrollX
            });
          }, 100);
        }
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.numImages === 0) {
        this.$emit("loaded");
      }
    });

    this.numImages = (this.renderedBody.match(imgRegExp) || []).length;
  },

  watch: {
    imagesLoaded(newValue) {
      if (this.numImages === newValue) {
        this.$emit("loaded");
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.blog-entry {
  margin: 4rem 0 12rem 0;

  pre {
    white-space: pre-wrap;
  }

  &--full &__posted-time {
    border-top: 1px $color-text-subtle solid;
  }

  &--full &__body {
    max-height: none;
  }

  &__meta > div {
    display: inline-block;
  }

  &__posted-time {
    color: $color-text-subtle;
    border-top: 1px $color-link-primary solid;
    padding-top: 5px;
    display: inline-block;
    font-size: 1rem;
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
    padding: 2rem 1rem 2rem 1rem;
    font-size: 1.5rem;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    max-height: 25rem;

    img {
      max-width: 100%;
    }

    &-more {
      text-transform: uppercase;
      position: absolute;
      width: calc(100% - 2rem);
      padding-top: 4.5rem;
      padding-bottom: 0.5rem;
      top: 22.5rem;
      background: linear-gradient(0deg, #000, 80%, transparent);
    }
  }

  &__foot {
    margin: 2rem 0;
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

  &__comments {
    margin: 0 -2rem;
    padding: 5rem 2rem;
    background-color: #111;
    border-top: 1rem #1f1f1f solid;
    border-bottom: 1rem #333 solid;
  }

  pre {
    overflow-x: auto;
  }

  .ql-video {
    width: 100%;
    height: calc(100vw * 0.5);
  }
}
</style>
