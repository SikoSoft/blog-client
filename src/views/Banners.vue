<template>
  <div class="banners">
    <admin-banners v-if="ready" :banners="banners" :links="bannerLinks" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import AdminBanners from "@/components/Admin/AdminBanners";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "banners",

  components: { AdminBanners },

  props: {
    links: Array
  },

  data() {
    return {
      context: { id: "view", props: ["banners"] },
      bannerLinks: []
    };
  },

  async created() {
    console.log("created banners");
  },

  async mounted() {
    await this.addContext(this.context);
    await this.initialize();
    const { links } = await this.getBanners();
    this.bannerLinks = links;
  },

  beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["banners"]),

    ...mapGetters(["ready"])
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["addContext", "removeContext", "initialize", "getBanners"])
  }
};
</script>
