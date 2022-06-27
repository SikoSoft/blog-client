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
      <admin-image-size :links="imageLinks" :initial="{}" />
    </fieldset>
  </div>
</template>

<script>
import AdminImageSize from "@/components/Admin/Images/ImageSize";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-images",

  components: { AdminImageSize },

  props: {
    imageSizes: Array,
    links: Array
  },

  computed: {
    imageLinks() {
      return this.linksByEntity("imageSize");
    }
  },

  methods: {
    ...linkHandlers
  }
};
</script>
