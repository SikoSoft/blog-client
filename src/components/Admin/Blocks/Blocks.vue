<template>
  <div class="admin-blocks">
    <admin-block
      v-for="block of blocks"
      :key="block.id"
      :initial="block"
      :content="block.content"
      :context="block.context"
      :links="[
        ...block.links,
        ...(contentLinks ? contentLinks : []),
        ...(contextLinks ? contextLinks : [])
      ]"
    />
    <admin-block :links="blockLinks" />
  </div>
</template>

<script>
import AdminBlock from "@/components/Admin/Blocks/Block";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-blocks",

  components: {
    AdminBlock
  },

  props: {
    blocks: Array,
    links: Array
  },

  computed: {
    blockLinks() {
      return this.linksByEntity("block");
    },

    contentLinks() {
      return this.linksByEntity("blockContent");
    },

    contextLinks() {
      return this.linksByEntity("blockContext");
    }
  },

  methods: {
    ...linkHandlers
  }
};
</script>
