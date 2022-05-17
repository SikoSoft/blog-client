<template>
  <div class="admin-images">
    <admin-image-size
      v-for="imageSize of imageSizes"
      :key="imageSize.width"
      :initial="imageSize"
      :links="imageSize.links"
    />
    <fieldset>
      <legend>{{ $strings.newImageSize }}</legend>
      <admin-image-size :links="links" :initial="{}" />
    </fieldset>
  </div>
</template>

<script>
import AdminImageSize from "@/components/Admin/AdminImageSize.vue";

export default {
  name: "admin-images",

  components: { AdminImageSize },

  props: {
    imageSizes: Array,
    links: Object
  }
};
</script>
