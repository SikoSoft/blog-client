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
      bannerLinks: []
    };
  },

  async mounted() {
    await this.addContext({ id: "view", props: ["banners"] });
    await this.initialize();
    const { links } = await this.getBanners();
    this.bannerLinks = links;
  },

  computed: {
    ...mapState(["banners"]),

    ...mapGetters(["ready"])
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["addContext", "initialize", "getBanners"])
  }
};
</script>
