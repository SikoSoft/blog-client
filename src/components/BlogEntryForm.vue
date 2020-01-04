<template>
  <form class="blog-entry-form">
    <input type="text" v-model="title" />
    <div id="quilljs-editor"></div>
  </form>
</template>

<script>
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
    this.editor = new Quill("#quilljs-editor", { theme: "snow" });
  }
};
</script>

<style lang="scss">
#quilljs-editor {
  background-color: #fff;
}
</style>