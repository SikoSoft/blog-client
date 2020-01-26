<template>
  <div class="blog-tag-manager">
    <div class="blog-tag-manager__new">
      <div class="blog-tag-manager__input-wrapper">
        <input
          ref="tagInput"
          type="text"
          v-model="tag"
          :placeholder="$strings.tags"
          @keydown="tagsKeyDown"
          @focus="tagsFocus"
          @blur="tagsBlur"
        />
        <button type="button" v-if="tagIsValid(tag)" @click="addTag">+</button>
        <ul class="blog-tag-manager__auto-list" v-if="tagsFocused && autoTags.length">
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
          >{{ autoTag }}</li>
        </ul>
      </div>
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
export default {
  name: "blog-tag-manager",

  data() {
    return {
      tagsCoolDown: 200,
      tagsTimeout: 0,
      minTagLength: 3,
      tag: "",
      autoTags: [],
      autoTagSelected: "",
      tagsFocused: false
    };
  },

  props: ["tags", "api"],

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
      this.$parent.setTags([...this.$parent.tags, this.tag.toLowerCase()]);
      this.tag = "";
      this.autoTags = this.autoTags.filter(tag => !this.tags.includes(tag));
      this.autoTagSelected = "";
    },

    deleteTag(tag) {
      this.$parent.setTags(this.$parent.tags.filter(t => t != tag));
    },

    getTags() {
      fetch(`${this.api.getTags.href}?tag=${encodeURIComponent(this.tag)}`, {
        method: this.api.getTags.method,
        headers: this.headers
      })
        .then(response => response.json())
        .then(json => {
          this.autoTags = json.tags.filter(tag => !this.tags.includes(tag));
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.blog-tag-manager {
  display: flex;
  align-items: center;

  &__new {
    margin-right: 1rem;
  }

  &__input-wrapper {
    display: inline-block;
    position: relative;

    input {
      width: 12rem;
    }

    button {
      position: absolute;
      top: 0;
      right: 0;
    }

    .blog-tag-manager__auto-list {
      position: absolute;
      top: calc(100% - 8px);
      left: 0;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

      &-item {
        background-color: #ccc;
        color: #000;
        padding: 8px;

        &--selected {
          background-color: #fff;
          font-weight: bold;
          cursor: pointer;
        }
      }
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
