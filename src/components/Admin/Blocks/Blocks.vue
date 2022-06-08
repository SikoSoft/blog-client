<template>
  <div class="admin-blocks">
    <admin-block
      v-for="block of blocks"
      :key="block.id"
      :initial="block"
      :content="block.content"
      :context="block.context"
      :links="[...block.links, ...links]"
    />
    <admin-block :links="links" />
  </div>
</template>

<script>
import AdminBlock from "@/components/Admin/Blocks/Block";

export default {
  name: "admin-blocks",

  components: {
    AdminBlock
  },

  props: {
    blocks: Array,
    links: Array
  },

  updated() {
    console.log("AdminBlocks updated");
  }
};
</script>
