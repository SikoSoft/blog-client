<template>
  <div class="blog-tag-manager">
    <div class="blog-tag-manager__new">
      <blog-tag-input
        :tagsToFilter="tags"
        @tagChanged="tagChanged"
        @tagEntered="addTag"
      />
      <blog-button v-if="tagIsValid(tag)" :action="addTag" text="+" />
    </div>
    <ul class="blog-tag-manager__list">
      <li v-for="tag in tags" :key="`tags-${tag}`">
        {{ tag }}
        <span class="blog-tag-manager__remove" @click="deleteTag(tag)">X</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import BlogTagInput from "@/components/BlogTagInput.vue";
import BlogButton from "@/components/BlogButton.vue";

export default {
  name: "blog-tag-manager",

  components: { BlogTagInput, BlogButton },

  data() {
    return {
      tagsCoolDown: 200,
      tagsTimeout: 0,
      minTagLength: 2,
      tag: "",
      autoTags: [],
      autoTagSelected: "",
      tagsFocused: false
    };
  },

  props: {
    tags: { type: Array }
  },

  computed: {
    ...mapGetters(["links"])
  },

  methods: {
    tagChanged({ tag }) {
      this.tag = tag;
    },

    tagIsValid(tag) {
      if (tag.length >= this.minTagLength) {
        return true;
      }
      return false;
    },

    addTag() {
      this.$emit("tagsUpdated", [...this.tags, this.tag]);
      this.tag = "";
    },

    deleteTag(tag) {
      this.$emit(
        "tagsUpdated",
        this.tags.filter(t => t != tag)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/variables.scss";

.blog-tag-manager {
  display: flex;
  align-items: center;

  &__new {
    margin-right: 1rem;
    position: relative;

    button {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      margin-right: 1rem;
      font-size: 16px;
      padding: 4px;
      background-color: rgba(0, 0, 0, 0.1);
      border: 1px #000 solid;
      border-radius: 4px;

      .blog-tag-manager__remove {
        display: inline-block;
        padding: 4px;
        cursor: pointer;
        border: 1px;
        border-radius: 4px;
        background-color: $color-action-destroy-bg;
        color: $color-action-destroy-text;
      }
    }
  }
}
</style>
