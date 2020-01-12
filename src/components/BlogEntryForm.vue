<template>
  <form class="blog-entry-form" @submit="submitForm">
    <div class="blog-entry-form__head">
      <h2 v-if="!entry.id">{{ $strings.newEntry }}</h2>
      <h2 v-else>{{ $strings.editEntry }}</h2>
    </div>
    <div class="blog-entry-form_title">
      <input
        type="text"
        class="blog-entry-form__title"
        v-model="title"
        :placeholder="$strings.title"
      />
    </div>
    <div class="blog-entry-form__body">
      <div :id="editorId"></div>
    </div>
    <div class="blog-entry-form__tags">
      <div class="blog-entry-form__tags-new">
        <div class="blog-entry-form__tags-input-wrapper">
          <input
            type="text"
            v-model="tag"
            :placeholder="$strings.tags"
            @keydown="tagsKeyDown"
            @focus="tagsFocus"
            @blur="tagsBlur"
          />
          <button type="button" v-if="tagIsValid(tag)" @click="addTag">+</button>
          <ul class="blog-entry-form__tags-auto-list" v-if="tagsFocused && autoTags.length">
            <li
              class="blog-entry-form__tags-auto-list-item"
              :class="{
                'blog-entry-form__tags-auto-list-item--selected':
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
      <ul class="blog-entry-form__tags-list">
        <li v-for="tag in tags" :key="`tags-${tag}`">
          {{ tag }}
          <span class="blog-entry-form__tags-remove" @click="deleteTag(tag)">X</span>
        </li>
      </ul>
    </div>
    <div class="blog-entry-form__buttons">
      <button v-if="entry.id">{{ $strings.updateEntry }}</button>
      <button v-else>{{ $strings.postEntry }}</button>
      <button type="button" v-if="entry.id" @click="deleteEntry">{{ $strings.deleteEntry }}</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Quill from "quill";

export default {
  name: "blog-entry-form",

  props: ["entry"],

  data() {
    return {
      tagsCoolDown: 200,
      tagsTimeout: 0,
      minTagLength: 3,
      title: this.entry.title ? this.entry.title : "",
      body: this.entry.body ? this.entry.body : "",
      tags: this.entry.tags ? this.entry.tags : [],
      tag: "",
      autoTags: [],
      autoTagSelected: "",
      tagsFocused: false,
      editor: false
    };
  },

  mounted() {
    this.editor = new Quill(`#${this.editorId}`, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"]
        ]
      }
    });
    if (this.body) {
      this.editor.setContents(JSON.parse(this.body));
    }
  },

  computed: {
    ...mapGetters(["api"]),
    editorId() {
      return `quilljs-editor${this.entry.id ? "-" + this.entry.id : ""}`;
    }
  },

  methods: {
    ...mapActions(["getEntries"]),
    submitForm(e) {
      const bodyDelta = this.editor.getContents().ops;
      fetch(this.entry.api.save.href, {
        method: this.entry.api.save.method,
        body: JSON.stringify({
          title: this.title,
          body: bodyDelta,
          tags: this.tags
        })
      })
        .then(response => response.json())
        .then(json => {
          this.getEntries(true).then(() => {
            this.$router.push({ path: `/entry/${json.id}` });
          });
        });
      e.preventDefault();
    },

    deleteEntry() {
      fetch(this.entry.api.delete.href, {
        method: this.entry.api.delete.method
      })
        .then(response => response.json())
        .then(json => {
          this.getEntries(true);
        });
    },

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
      console.log("autoTagUp");
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
      this.tags.push(this.tag.toLowerCase());
      this.tag = "";
      this.autoTags = this.autoTags.filter(tag => !this.tags.includes(tag));
      this.autoTagSelected = "";
    },

    deleteTag(tag) {
      this.tags = this.tags.filter(t => t != tag);
    },

    getTags() {
      fetch(`${this.api.getTags.href}?tag=${encodeURIComponent(this.tag)}`, {
        method: this.api.getTags.method
      })
        .then(response => response.json())
        .then(json => {
          this.autoTags = json.tags.filter(tag => !this.tags.includes(tag));
        });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

#quilljs-editor {
  background-color: #fff;
}

.blog-entry-form {
  margin: 16px 0;

  input,
  button,
  &__body {
    margin: 8px 0;
    border-radius: 4px;
    border: 4px #000 solid;
    background-color: #fff;
    color: #000;
  }

  .blog-entry-form__title {
    font-size: 2rem;
    width: 36rem;
  }

  .blog-entry-form__tags {
    display: flex;
    align-items: center;
  }

  .blog-entry-form__tags-new {
    margin-right: 1rem;
  }

  .blog-entry-form__tags-input-wrapper {
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

    .blog-entry-form__tags-auto-list {
      position: absolute;
      top: 100%;
      left: 0;
      list-style: none;
      margin: 0;
      padding: 0;

      &-item {
        background-color: #ccc;
        color: #000;
        padding: 8px;

        &--selected {
          background-color: #fff;
          font-weight: bold;
        }
      }
    }
  }

  .blog-entry-form__tags-list {
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

      .blog-entry-form__tags-remove {
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

  .ql-blank {
    min-height: 5rem;
  }
}
</style>
