<template>
  <form class="blog-entry-form" @submit="submitForm">
    <h2 v-if="!entry.id">{{ $strings.newEntry }}</h2>
    <h2 v-else>{{ $strings.editEntry }}</h2>
    <input type="text" v-model="title" />
    <div class="blog-entry-form__body">
      <div :id="editorId"></div>
    </div>
    <button v-if="entry.id">{{ $strings.updateEntry }}</button>
    <button v-else>{{ $strings.postEntry }}</button>
    <button type="button" v-if="entry.id" @click="deleteEntry">{{ $strings.deleteEntry }}</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

import Quill from "quill";

export default {
  name: "blog-entry-form",

  props: ["entry"],

  data() {
    return {
      title: this.entry.title ? this.entry.title : "",
      body: this.entry.body ? this.entry.body : "",
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
          body: bodyDelta
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
    }
  }
};
</script>

<style lang="scss">
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
}
</style>
