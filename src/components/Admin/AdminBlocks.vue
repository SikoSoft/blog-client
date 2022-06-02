<template>
  <div class="admin-blocks">
    <admin-block
      v-for="block of blocks"
      :key="block.id"
      :initial="block"
      :links="block.links"
    />
    <admin-block :links="links" />
  </div>
</template>

<script>
import AdminBlock from "@/components/Admin/AdminBlock";

export default {
  name: "admin-blocks",

  components: {
    AdminBlock
  },

  props: {
    blocks: Array,
    links: Array
  }
};
</script>
