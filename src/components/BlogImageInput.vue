<template>
  <input type="text" :placeholder="$strings.imageUrl" @change="handleChange" />
</template>

<script>
import { mapActions } from "vuex";
import imageHandler from "@/util/imageHandler";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blog-image-input",

  props: {
    initial: String,
    links: Array
  },

  data() {
    return {
      input: this?.initial || ""
    };
  },

  mounted() {
    this.setupImageHandler();
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["setProgress"]),

    setupImageHandler() {
      this.imageHandler = new imageHandler({
        setProgress: this.setProgress,
        uploadImage: this.link("POST", "imageUpload"),
        headers: this.headers
      });
    },

    handleChange(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>
