<template>
  <form class="blog-entry-form" @submit="submitForm" :id="formId">
    <div class="blog-entry-form__head">
      <h2 v-if="!entry.id">{{ $strings.newEntry }}</h2>
      <h2 v-else>{{ $strings.editEntry }}</h2>
    </div>
    <div class="blog-entry-form_title">
      <input
        type="text"
        class="blog-entry-form__title"
        v-model="title"
        @keyup="saveFormState"
        :placeholder="$strings.title"
      />
    </div>
    <div class="blog-entry-form__body">
      <div :id="editorId"></div>
    </div>
    <div class="blog-entry-form__tags">
      <blog-tag-manager :tags="tags" :api="api" />
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

import BlogTagManager from "@/components/BlogTagManager.vue";
import imageHandler from "@/util/imageHandler";

export default {
  name: "blog-entry-form",

  props: ["entry"],

  components: { BlogTagManager },

  data() {
    return {
      title: this.entry.title ? this.entry.title : "",
      body: this.entry.body ? this.entry.body : "",
      tags: this.entry.tags ? this.entry.tags : [],
      editor: false,
      initialized: false
    };
  },

  mounted() {
    this.editor = new Quill(`#${this.editorId}`, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
          ],
          ["link", "image", "video", "code-block"]
        ]
      }
    });
    if (this.body) {
      this.editor.setContents(JSON.parse(this.body));
    }
    imageHandler.setup({
      editor: this.editor,
      uploadImage: this.api.uploadImage,
      headers: this.headers
    });
    this.editor.getModule("toolbar").addHandler("image", () => {
      imageHandler.selectLocalImage();
    });
    this.editor.on("text-change", () => {
      this.saveFormState();
    });
    if (localStorage.getItem(this.formId)) {
      this.loadFormState();
    }
    this.initialized = true;
  },

  computed: {
    ...mapGetters(["api", "headers"]),

    editorId() {
      return `quilljs-editor${this.entry.id ? "-" + this.entry.id : ""}`;
    },

    formId() {
      return `entry-form${this.entry.id ? "-" + this.entry.id : ""}`;
    }
  },

  methods: {
    ...mapActions([
      "getEntries",
      "hideEntryForm",
      "setEditMode",
      "setEntryById"
    ]),

    submitForm(e) {
      const bodyDelta = this.editor.getContents().ops;
      const entry = {
        title: this.title,
        body: bodyDelta,
        tags: this.tags
      };
      fetch(this.entry.api.save.href, {
        method: this.entry.api.save.method,
        headers: this.headers,
        body: JSON.stringify(entry)
      })
        .then(response => response.json())
        .then(json => {
          this.getEntries(true).then(() => {
            this.hideEntryForm();
            this.setEntryById({ id: json.id, entry });
            this.setEditMode({ id: json.id, mode: false });
            if (window.location.pathname !== `/entry/${json.id}`) {
              this.$router.push({ path: `/entry/${json.id}` });
            }
          });
        });
      e.preventDefault();
    },

    deleteEntry() {
      fetch(this.entry.api.delete.href, {
        method: this.entry.api.delete.method,
        headers: this.headers
      })
        .then(response => response.json())
        .then(() => {
          this.getEntries(true);
        });
    },

    setTags(tags) {
      this.tags = tags;
      this.saveFormState();
    },

    saveFormState() {
      if (!this.initialized) {
        return;
      }
      localStorage.setItem(
        this.formId,
        JSON.stringify({
          title: this.title,
          body: this.editor.getContents().ops,
          tags: this.tags
        })
      );
    },

    loadFormState() {
      try {
        const state = JSON.parse(localStorage.getItem(this.formId));
        this.title = state.title;
        this.editor.setContents(state.body);
        this.tags = state.tags;
      } catch (e) {
        console.log("corrupt form data", e);
      }
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
  }

  .ql-blank {
    min-height: 5rem;
  }
}
</style>
