<template>
  <div class="admin-block-content">
    <select v-model="type">
      <option v-for="blockType of types" :key="blockType" :value="blockType">{{
        $strings.blockTypes[`CODE_${blockType}`]
      }}</option>
    </select>
    <div class="admin-block-content__content">
      <textarea v-model="content"></textarea>
    </div>
    <div class="admin-block-content__buttons">
      <blog-button
        create
        v-if="addLink"
        :action="addContent"
        :text="$strings.add"
      />
      <blog-button
        create
        v-if="updateLink"
        :action="updateContent"
        :text="$strings.update"
      />
      <blog-button
        destroy
        v-if="deleteLink"
        :action="deleteContent"
        :text="$strings.delete"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import BlogButton from "@/components/BlogButton";
import linkHandlers from "@/shared/linkHandlers";
import { blockTypes } from "blog-spec";

export default {
  name: "admin-block-content",

  components: { BlogButton },

  props: {
    links: Array,
    initial: Object,
    blockId: Number
  },

  data() {
    return {
      types: Object.values(blockTypes),
      type: this?.initial?.type || 0,
      content: this?.initial?.content || ""
    };
  },

  computed: {
    ...mapState(["blocks"]),

    payload() {
      return {
        type: this.type,
        block_id: this.blockId,
        content: this.content
      };
    },

    addLink() {
      return this.link("POST", "blockContent");
    },

    updateLink() {
      return this.link("PUT", "blockContent");
    },

    deleteLink() {
      return this.link("DELETE", "blockContent");
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["apiRequest"]),

    ...mapMutations(["setBlocks"]),

    async addContent() {
      const { content } = await this.apiRequest({
        ...this.addLink,
        body: this.payload
      });
      console.log("content", content);
    },

    async updateContent() {
      const { content } = await this.apiRequest({
        ...this.updateLink,
        body: this.payload
      });
      console.log("content", content);
    },

    async deleteContent() {
      await this.apiRequest(this.deleteLink);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@theme/variables";
@import "@theme/mixins";

.admin-block-content {
  @include admin-list-item;

  &__content {
    textarea {
      width: 100%;
      height: 10rem;
      box-sizing: border-box;
    }
  }

  &__buttons {
    margin-top: $space;
  }
}
</style>
