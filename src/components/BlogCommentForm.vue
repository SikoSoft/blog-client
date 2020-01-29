<template>
  <form class="blog-comment-form" @submit="submitForm" :id="formId">
    <div class="blog-comment-form__head">
      <h2>{{ $strings.leaveAComment }}</h2>
    </div>
    <div class="blog-comment-form_name">
      <input
        type="text"
        class="blog-comment-form__name"
        v-model="name"
        @keyup="saveFormState"
        :placeholder="$strings.name"
      />
    </div>
    <div class="blog-comment-form__message">
      <div :id="editorId"></div>
    </div>
    <div class="blog-comment-form__buttons">
      <button>{{ $strings.postComment }}</button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

import Quill from "quill";

export default {
  name: "blog-comment-form",

  data() {
    return {
      name: "",
      editor: false
    };
  },

  props: ["entry"],

  mounted() {
    this.editor = new Quill(`#${this.editorId}`, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          ["link", "code-block"]
        ]
      }
    });
    if (this.body) {
      this.editor.setContents(JSON.parse(this.body));
    }
    this.editor.on("text-change", () => {
      this.saveFormState();
    });
    if (localStorage.getItem(this.formId)) {
      this.loadFormState();
    }
    this.initialized = true;
  },

  computed: {
    ...mapGetters(["headers"]),

    editorId() {
      return `quilljs-comment-editor${this.entry.id}`;
    },

    formId() {
      return `comment-form${this.entry.id}`;
    }
  },

  methods: {
    submitForm(e) {
      const messageDelta = this.editor.getContents().ops;
      const entry = {
        name: this.name,
        message: messageDelta
      };
      fetch(this.entry.api.postComment.href, {
        method: this.entry.api.postComment.method,
        headers: this.headers,
        body: JSON.stringify(entry)
      })
        .then(response => response.json())
        .then(json => {
          console.log("json", json);
        });
      e.preventDefault();
    },

    saveFormState() {
      if (!this.initialized) {
        return;
      }
      localStorage.setItem(
        this.formId,
        JSON.stringify({
          name: this.name,
          message: this.editor.getContents().ops
        })
      );
    },

    loadFormState() {
      try {
        const state = JSON.parse(localStorage.getItem(this.formId));
        this.name = state.name;
        this.editor.setContents(state.message);
      } catch (e) {
        console.log("corrupt form data", e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-comment-form {
  &__message {
    margin: 8px 0;
    border-radius: 4px;
    border: 4px #000 solid;
    background-color: #fff;
    color: #000;
  }

  .ql-blank {
    min-height: 5rem;
  }
}
</style>
