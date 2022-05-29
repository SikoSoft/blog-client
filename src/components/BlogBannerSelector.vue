<template>
  <select class="blog-banner-selector" v-if="ready" @change="change">
    <option value="0" :selected="0 === value">{{
      $strings.selectABanner
    }}</option>
    <option
      v-for="banner in banners"
      :key="banner.id"
      :selected="banner.id === value"
      >{{ banner.id }}</option
    >
  </select>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "blog-banner-selector",

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
