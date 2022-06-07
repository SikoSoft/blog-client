<template>
  <div class="blog-block-content">
    <template v-if="type === 0">
      {{ content }}
    </template>
    <template v-if="type === 1">
      <div v-html="content" />
    </template>
    <template v-if="type === 2">
      {{ editorContent }}
    </template>
    <template v-if="type === 3">
      <component :is="componentType" v-bind="componentProps" />
    </template>
  </div>
</template>

<script>
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import BlockGithubFeed from "@/components/Blocks/GithubFeed/GithubFeed";
import blockComponents from "@/data/blockComponents.json";
import { typeMap } from "blog-spec";

export default {
  name: "blog-block-content",

  components: { BlockGithubFeed },

  props: {
    type: Number,
    content: String,
    props: Array
  },

  computed: {
    editorContent() {
      return this.type === 2
        ? new QuillDeltaToHtmlConverter(JSON.parse(this.body), {}).convert()
        : "";
    },

    componentConfig() {
      return blockComponents.filter(
        componentConfig => componentConfig.id === this.content
      )[0];
    },

    componentType() {
      switch (this.content) {
        case "GithubFeed":
          return BlockGithubFeed;
      }
      return BlockGithubFeed;
    },

    componentProps() {
      const props = {};
      if (this.componentConfig.props.length) {
        for (const propConfig of this.componentConfig.props) {
          const propRow = this.props.filter(
            prop => prop.name === propConfig.id
          )?.[0];
          if (propRow) {
            console.log("propRow", propRow);
            props[propConfig.id] = propRow[typeMap[propConfig.type]];
          }
        }
      }
      return props;
    }
  }
};
</script>
