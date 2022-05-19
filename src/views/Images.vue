<template>
  <div class="images">
    <admin-images
      v-if="initialized && imageSizes"
      :imageSizes="imageSizes"
      :links="{ add: links.addImageSize }"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import AdminImages from "@/components/Admin/AdminImages";

export default {
  name: "image-sizes",

  components: { AdminImages },

  data() {
    return {
      fetched: false
    };
  },

  mounted() {
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    ...mapState(["imageSizes", "initialized", "links"])
  },

  methods: {
    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "getRoleRights",
      "apiRequest"
    ]),

    ...mapMutations(["setImageSizes"]),

    async update() {
      await this.initialize();
      this.setBreadcrumbs([
        { href: "/admin", label: this.$strings.admin },
        { href: "/admin/images", label: this.$strings.images }
      ]);
      this.setTitle(this.$strings.images);
      if (!this.fetched) {
        this.getImageSizes();
      }
    },

    async getImageSizes() {
      const { imageSizes } = await this.apiRequest(this.links.getImageSizes);
      this.setImageSizes({ imageSizes });
      this.fetched = true;
    }
  },

  watch: {
    initialized() {
      if (!this.links.getImageSizes) {
        this.$router.push({ path: "/access_denied" });
      }
    }
  }
};
</script>
