<template>
  <form class="blog-entry-form" @submit="submitForm">
    <h2>{{ $strings.newEntry }}</h2>
    <input type="text" v-model="title" />
    <div class="blog-entry-form__body">
      <div id="quilljs-editor"></div>
    </div>
    <button>{{ $strings.postEntry }}</button>
  </form>
</template>

<script>
import { mapGetters } from "vuex";

import Quill from "quill";

export default {
  name: "blog-entry-form",

  data() {
    return {
      title: "",
      body: "",
      editor: false
    };
  },

  mounted() {
    this.editor = new Quill("#quilljs-editor", {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"]
        ]
      }
    });
  },

  computed: mapGetters(["api"]),

  methods: {
    submitForm(e) {
      const bodyDelta = this.editor.getContents();
      fetch(this.api.saveEntry, {
        method: "POST",
        body: JSON.stringify({
          title: this.title,
          body: bodyDelta
        })
      })
        .then(response => response.json())
        .then(json => {
          this.$router.push({ path: `/entry/${json.id}` });
        });
      e.preventDefault();
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
