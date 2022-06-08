<template>
  <div class="admin-block-content-props">
    <admin-block-content-prop
      v-for="prop of props"
      :key="prop.id"
      v-bind="prop"
    />
  </div>
</template>

<script>
import AdminBlockContentProp from "@/components/Admin/Blocks/BlockContentProp";

export default {
  name: "admin-block-content-props",

  components: { AdminBlockContentProp },

  props: {
    contentId: Number,
    props: Array
  }
};
</script>
