<template>
  <div class="blog-image-input">
    <input
      type="text"
      :value="value"
      :placeholder="$strings.imageUrl"
      @change="handleChange"
    />
    <blog-button :text="$strings.upload" :action="selectFile" v-if="ready" />
    <div class="blog-image-input__preview">
      <img :src="value" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import BlogButton from "@/components/BlogButton";
import imageHandler from "@/util/imageHandler";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blog-image-input",

  components: { BlogButton },

  props: {
    type: String,
    value: String,
    initial: String
    //links: Array
  },

  data() {
    return {
      context: { id: "needs", props: ["uploadImage", this.type] }
    };
  },

  created() {
    this.addContext(this.context);
  },

  updated() {
    if (this.ready) {
      this.setupImageHandler();
    }
  },

  beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["links"]),

    ...mapGetters(["contextIsReady", "headers"]),

    ready() {
      return this.contextIsReady(this.context);
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["setProgress", "addContext", "removeContext"]),

    setupImageHandler() {
      this.imageHandler = new imageHandler({
        setProgress: this.setProgress,
        uploadImage: {
          ...this.link("POST", "uploadImage", this.links),
          headers: this.headers
        },
        headers: this.headers,
        setImage: this.updateImage
      });
    },

    updateImage(url) {
      this.$emit("input", url);
    },

    handleChange(e) {
      this.$emit("input", e.target.value);
    },

    selectFile() {
      this.imageHandler.selectLocalImage();
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-image-input {
  &__preview {
    max-height: 256px;
    overflow: hidden;

    img {
      max-height: 256px;
    }
  }
}
</style>
