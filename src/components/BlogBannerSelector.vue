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
      firstUpdate: true,
      context: { id: "view", props: ["banners"] }
    };
  },

  async created() {
    await this.addContext(this.context);
  },

  async updated() {
    if (this.contextIsReady(this.context) && this.firstUpdate) {
      await this.getBanners();
      this.firstUpdate = false;
    }
  },

  computed: {
    ...mapState(["banners"]),

    ...mapGetters(["contextIsReady"]),

    ready() {
      return this.contextIsReady(this.context);
    }
  },

  methods: {
    ...mapActions(["getBanners", "addContext"]),

    change(e) {
      this.$emit("input", parseInt(e.target.value));
    }
  }
};
</script>
