<template>
  <div class="images">
    <admin-images
      v-if="initialized && ready"
      :imageSizes="imageSizes"
      :links="imageLinks"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import AdminImages from "@/components/Admin/Images/Images";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "image-sizes",

  components: { AdminImages },

  data() {
    return {
      context: { id: "view", props: ["imageSizes"] },
      fetched: false,
      imageLinks: []
    };
  },

  props: {
    links: Array
  },

  mounted() {
    this.addContext(this.context);
    this.update();
  },

  updated() {
    this.update();
  },

  beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["imageSizes", "initialized", "user"]),

    ...mapGetters(["contextIsReady"]),

    ready() {
      return this.contextIsReady(this.context);
    },

    getLink() {
      return this.link("GET", "imageSizes");
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "getRoleRights",
      "apiRequest",
      "addContext",
      "removeContext"
    ]),

    ...mapMutations(["setImageSizes"]),

    async update() {
      await this.initialize();
      this.setBreadcrumbs([
        { href: "/admin", label: this.$strings.admin },
        { href: "/admin/images", label: this.$strings.images }
      ]);
      this.setTitle(this.$strings.images);
      if (!this.fetched && this.getLink) {
        this.getImageSizes();
      }
    },

    async getImageSizes() {
      const { imageSizes, links } = await this.apiRequest(this.getLink);
      this.imageLinks = links;
      this.setImageSizes({ imageSizes });
      this.fetched = true;
    }
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_images")) {
        this.$router.push({ path: "/access_denied" });
      }
    }
  }
};
</script>
