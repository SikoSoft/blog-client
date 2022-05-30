<template>
  <div class="blog-banner-selector">
    <select v-if="ready" @change="change">
      <option value="0" :selected="0 === value">{{
        $strings.selectABanner
      }}</option>
      <option
        v-for="banner in banners"
        :key="banner.id"
        :selected="banner.id === value"
        :value="banner.id"
        >{{ banner.heading }} ({{ banner.id }})</option
      >
    </select>
    <div class="blog-banner-selector__preview" v-if="selectedBanner">
      <blog-banner
        :heading="selectedBanner.heading"
        :caption="selectedBanner.caption"
        :image="selectedBanner.image"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import BlogBanner from "@/components/BlogBanner";

export default {
  name: "blog-banner-selector",

  components: { BlogBanner },

  props: {
    value: Number
  },

  data() {
    return {
      context: { id: "needs", props: ["banners"] },
      setupResponse: false
    };
  },

  async created() {
    await this.addContext(this.context);
  },

  async updated() {
    if (this.contextIsReady(this.context) && !this.setupResponse) {
      const response = this.getBanners();
      this.setupResponse = response;
    }
  },

  beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["banners"]),

    ...mapGetters(["contextIsReady"]),

    ready() {
      return this.contextIsReady(this.context);
    },

    selectedBanner() {
      return (
        this.banners.filter(banner => banner.id === this.value)[0] || false
      );
    }
  },

  methods: {
    ...mapActions(["getBanners", "addContext", "removeContext"]),

    change(e) {
      this.$emit("input", parseInt(e.target.value));
    },

    async update() {}
  }
};
</script>
