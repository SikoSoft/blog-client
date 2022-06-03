<template>
  <div class="blog-block-content">
    <template v-if="type === 0">
      {{ content }}
    </template>
    <template v-if="type === 1">
      <div v-html="content" />
    </template>
    <template v-if="type === 3">
      {{ editorContent }}
    </template>
  </div>
</template>

<script>
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default {
  name: "blog-block-content",

  props: {
    type: Number,
    content: String
  },

  computed: {
    editorContent() {
      return this.type === 3
        ? new QuillDeltaToHtmlConverter(JSON.parse(this.body), {}).convert()
        : "";
    }
  }
};
</script>
