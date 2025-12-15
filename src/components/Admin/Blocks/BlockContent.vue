<template>
  <div class="admin-block-content">
    <select v-model="type">
      <option v-for="blockType of types" :key="blockType" :value="blockType">{{
        $strings.blockTypes[`CODE_${blockType}`]
      }}</option>
    </select>
    <div class="admin-block-content__content">
      <template v-if="this.type === blockTypes.BLOCK_TYPE_COMPONENT">
        <select v-model="content">
          <option value="">{{ $strings.selectAComponent }}</option>
          <option v-for="component of blockComponents" :key="component.id">{{
            component.id
          }}</option>
        </select>
        <admin-block-content-props :props="props" :contentId="id" />
      </template>
      <template v-else>
        <textarea v-model="content"></textarea>
      </template>
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
        :action="showDeleteDialog"
        :text="$strings.delete"
      />
    </div>
    <blog-confirmation-dialog
      :title="$strings.deleteBlockContent"
      :message="$strings.confirmDeleteBlockContent"
      :isOpen="deleteDialogIsOpen"
    >
      <blog-button destroy :text="$strings.yes" :action="deleteContent" />
      <blog-button :text="$strings.no" :action="hideDeleteDialog" />
    </blog-confirmation-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import BlogButton from "@/components/BlogButton";
import AdminBlockContentProps from "@/components/Admin/Blocks/BlockContentProps";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";
import linkHandlers from "@/shared/linkHandlers";
import { blockTypes, typeMap } from "blog-spec";
import blockComponents from "@/data/blockComponents.json";

export default {
  name: "admin-block-content",

  components: { BlogButton, BlogConfirmationDialog, AdminBlockContentProps },

  props: {
    links: Array,
    initial: Object,
    blockId: Number
  },

  data() {
    return {
      deleteDialogIsOpen: false,
      blockTypes,
      blockComponents,
      types: Object.values(blockTypes),
      id: this?.initial?.id || 0,
      type: this?.initial?.type || 0,
      content: this?.initial?.content || "",
      propValues: this?.initial?.props || []
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
    },

    props() {
      return blockComponents
        .filter(component => component.id === this.content)?.[0]
        ?.props.map(prop => ({
          ...prop,
          value: this.propValues.filter(
            propValue => propValue.name === prop.id
          )?.[0]?.[typeMap[prop.type]]
        }));
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["apiRequest", "addToast"]),

    ...mapMutations(["setBlocks"]),

    async addContent() {
      const { blockContent } = await this.apiRequest({
        ...this.addLink,
        body: this.payload
      });
      this.setBlocks({
        blocks: this.blocks.map(block => ({
          ...block,
          content:
            block.id !== this.blockId
              ? block.content
              : [...block.content, blockContent]
        }))
      });
      this.reset();
      this.addToast(this.$strings.contentAdded);
    },

    async updateContent() {
      const { blockContent } = await this.apiRequest({
        ...this.updateLink,
        body: this.payload
      });
      console.log("content", blockContent);
      this.addToast(this.$strings.contentUpdated);
    },

    async deleteContent() {
      await this.apiRequest(this.deleteLink);
      this.setBlocks({
        blocks: this.blocks.map(block => ({
          ...block,
          content:
            block.id !== this.blockId
              ? block.content
              : block.content.filter(content => content.id !== this.id)
        }))
      });
      this.addToast(this.$strings.contentDeleted);
    },

    reset() {
      this.type = 0;
      this.content = "";
    },

    showDeleteDialog() {
      this.deleteDialogIsOpen = true;
    },

    hideDeleteDialog() {
      this.deleteDialogIsOpen = false;
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
