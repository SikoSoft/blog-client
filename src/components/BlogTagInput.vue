<template>
  <div class="blog-tag-input">
    <input
      ref="tagInput"
      type="text"
      v-model="tag"
      :placeholder="$strings.tag"
      @keydown="tagsKeyDown"
      @focus="tagsFocus"
      @blur="tagsBlur"
    />
    <ul
      class="blog-tag-manager__auto-list"
      v-if="tagsFocused && autoTags.length"
    >
      <li
        class="blog-tag-manager__auto-list-item"
        :class="{
          'blog-tag-manager__auto-list-item--selected':
            autoTag === autoTagSelected
        }"
        v-for="autoTag in autoTags"
        :key="`autoTag-${autoTag}`"
        @mousedown="tag = autoTag"
        @mouseover="autoTagSelected = autoTag"
      >
        {{ autoTag }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "blog-tag-input",

  props: {
    tagsToFilter: { type: Array }
  },

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

  computed: {
    ...mapGetters(["links"])
  },

  methods: {
    tagsKeyDown(e) {
      switch (e.which) {
        case 13:
          if (this.autoTagSelected && this.autoTagSelected !== this.tag) {
            this.tag = this.autoTagSelected;
          } else if (this.tagIsValid(this.tag)) {
            this.addTag();
          }
          e.preventDefault();
          break;
        case 38:
          this.autoTagUp();
          break;
        case 40:
          this.autoTagDown();
          break;
        default:
          if (this.tagsTimeout) {
            clearTimeout(this.tagsTimeout);
          }
          this.tagsTimeout = setTimeout(() => {
            this.getTags();
          }, this.tagsCoolDown);
      }
    },

    autoTagUp() {
      if (!this.autoTags) {
        return;
      }
      if (this.autoTagSelected === "") {
        this.autoTagSelected = this.autoTags[this.autoTags.length - 1];
      } else {
        let index = this.autoTags.indexOf(this.autoTagSelected) - 1;
        if (index < 0) {
          index = this.autoTags.length - 1;
        }
        this.autoTagSelected = this.autoTags[index];
      }
    },

    autoTagDown() {
      if (!this.autoTags) {
        return;
      }
      if (this.autoTagSelected === "") {
        this.autoTagSelected = this.autoTags[0];
      } else {
        let index = this.autoTags.indexOf(this.autoTagSelected) + 1;
        const max = this.autoTags.length - 1;
        if (index > max) {
          index = 0;
        }
        this.autoTagSelected = this.autoTags[index];
      }
    },

    tagsFocus() {
      this.tagsFocused = true;
    },

    tagsBlur() {
      this.tagsFocused = false;
    },

    tagIsValid(tag) {
      if (tag.length >= this.minTagLength) {
        return true;
      }
      return false;
    },

    addTag() {
      this.$emit("tagEntered", { tag: this.tag.toLowerCase() });
      this.tag = "";
      this.autoTags = this.autoTags.filter(
        tag => !this.tagsToFilter.includes(tag)
      );
      this.autoTagSelected = "";
    },

    deleteTag(tag) {
      this.$parent.setTags(this.$parent.tags.filter(t => t != tag));
    },

    getTags() {
      fetch(`${this.links.getTags.href}?tag=${encodeURIComponent(this.tag)}`, {
        method: this.links.getTags.method,
        headers: this.headers
      })
        .then(response => response.json())
        .then(json => {
          this.autoTags = json.tags.filter(
            tag => !this.tagsToFilter.includes(tag)
          );
        });
    }
  },

  watch: {
    tag() {
      this.$emit("tagChanged", { tag: this.tag });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/variables.scss";

.blog-tag-input {
  display: inline-block;
  position: relative;

  input {
    width: 12rem;
  }

  .blog-tag-manager__auto-list {
    @include dropdown-list;

    position: absolute;
    z-index: 2;
    top: calc(100% - 8px);
    left: 0;

    &-item {
      @include dropdown-item;
    }
  }
}
</style>
