<template>
  <blog-block v-if="ready && blockLinks.length" v-bind="block">
    <template>
      <blog-block-content
        v-for="content of block.content"
        :key="content.id"
        v-bind="content"
      />
    </template>
  </blog-block>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import BlogBlock from "@/components/BlogBlock";
import BlogBlockContent from "@/components/BlogBlockContent";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blog-block-injector",

  components: {
    BlogBlock,
    BlogBlockContent
  },

  props: {
    id: Number
  },

  data() {
    return {
      firstUpdate: true,
      context: { id: "needs", props: ["block", this.id] },
      blockLinks: []
    };
  },

  async created() {
    const response = await this.addContext(this.context);
    console.log(this.id, "response", JSON.stringify(response));
    this.blockLinks = response;
  },

  mounted() {
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    ...mapState(["blocksById"]),

    ...mapGetters(["contextIsReady"]),

    getLink() {
      return this.link("GET", "block", this.blockLinks);
    },

    ready() {
      return this.contextIsReady(this.context);
    },

    block() {
      return this.blocksById?.[this.id] || false;
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["addContext", "removeContext", "getBlock"]),

    ...mapMutations(["setBlock"]),

    async update() {
      if (this.ready && this.firstUpdate && this.getLink) {
        this.firstUpdate = false;
        try {
          await this.getBlock({ id: this.id, link: this.getLink });
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
};
</script>
