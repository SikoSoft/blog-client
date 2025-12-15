<template>
  <div class="admin-block">
    <input
      class="admin-block__name"
      type="text"
      v-model="name"
      :placeholder="$strings.name"
    />
    <fieldset class="admin-block__content" v-if="id">
      <legend>{{ $strings.content }}</legend>
      <blog-sortable-list @orderChanged="updateSortOrder">
        <blog-sortable-item
          v-for="contentRow of content"
          :key="contentRow.id"
          :id="contentRow.id"
        >
          <admin-block-content
            :initial="contentRow"
            :blockId="id"
            :links="contentRow.links"
          />
        </blog-sortable-item>
      </blog-sortable-list>
      <admin-block-content :blockId="id" :links="links" />
    </fieldset>
    <div class="admin-block__buttons">
      <blog-button
        create
        v-if="addLink"
        :action="addBlock"
        :text="$strings.add"
      />
      <blog-button
        create
        v-if="updateLink"
        :action="updateBlock"
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
      :title="$strings.deleteBlock"
      :message="$strings.confirmDeleteBlock"
      :isOpen="deleteDialogIsOpen"
    >
      <blog-button destroy :text="$strings.yes" :action="deleteBlock" />
      <blog-button :text="$strings.no" :action="hideDeleteDialog" />
    </blog-confirmation-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import AdminBlockContent from "@/components/Admin/Blocks/BlockContent";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";
import BlogSortableList from "@/components/BlogSortableList";
import BlogSortableItem from "@/components/BlogSortableItem";
import BlogButton from "@/components/BlogButton";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-block",

  components: {
    AdminBlockContent,
    BlogButton,
    BlogConfirmationDialog,
    BlogSortableList,
    BlogSortableItem
  },

  props: {
    initial: Object,
    content: [],
    context: [],
    links: Array
  },

  data() {
    return {
      id: this?.initial?.id || 0,
      name: this?.initial?.name || "",
      deleteDialogIsOpen: false
    };
  },

  computed: {
    ...mapState(["blocks"]),

    payload() {
      return {
        name: this.name
      };
    },

    addLink() {
      return this.link("POST", "block");
    },

    updateLink() {
      return this.link("PUT", "block");
    },

    deleteLink() {
      return this.link("DELETE", "block");
    },

    addContextLinks() {
      return this.link();
    },

    addContentLinks() {
      return [];
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["apiRequest", "addToast"]),

    ...mapMutations(["setBlocks", "setBlockContent"]),

    async addBlock() {
      const { block } = await this.apiRequest({
        ...this.addLink,
        body: this.payload
      });
      this.setBlocks({ blocks: [...this.blocks, block] });
      this.reset();
      this.addToast(this.$strings.blockAdded);
    },

    async updateBlock() {
      const { block } = await this.apiRequest({
        ...this.updateLink,
        body: this.payload
      });
      this.setBlocks({
        blocks: [
          ...this.blocks.map(stateBlock =>
            this.id === stateBlock.id ? block : stateBlock
          )
        ]
      });
      this.addToast(this.$strings.blockUpdated);
    },

    async deleteBlock() {
      const { result } = await this.apiRequest(this.deleteLink);
      if (result) {
        this.setBlocks({
          blocks: [...this.blocks.filter(block => block.id !== this.id)]
        });
      }
      this.addToast(this.$strings.blockDeleted);
    },

    reset() {
      this.id = 0;
      this.name = "";
    },

    showDeleteDialog() {
      this.deleteDialogIsOpen = true;
    },

    hideDeleteDialog() {
      this.deleteDialogIsOpen = false;
    },

    async updateSortOrder(order) {
      const newBlockContent = [];
      for (const contentRow of this.content) {
        const { blockContent } = await this.apiRequest({
          ...this.link("PUT", "blockContent", contentRow.links),
          body: { order: order.indexOf(contentRow.id.toString()) + 1 }
        });
        newBlockContent.push(blockContent);
      }
      this.setBlockContent({
        blockId: this.id,
        content: newBlockContent.sort((a, b) =>
          a.order < b.order ? -1 : a.order > b.order ? 1 : 0
        )
      });
      this.addToast(this.$strings.blockContentOrderUpdated);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@theme/variables";
@import "@theme/mixins";

.admin-block {
  @include admin-list-item;

  &__name {
    width: 40%;
  }

  &__context,
  &__content,
  &__buttons {
    margin-top: $space;
  }
}
</style>
