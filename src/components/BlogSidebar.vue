<template>
  <aside class="blog-sidebar" v-if="show">
    <blog-block-injector :id="settings.sidebar_block" />
  </aside>
</template>

<script>
import { mapState } from "vuex";
import BlogBlockInjector from "@/components/BlogBlockInjector";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blog-sidebar",

  components: { BlogBlockInjector },

  props: {
    filters: Array
  },

  data() {
    return {
      feed: []
    };
  },

  mounted() {},

  methods: {
    ...linkHandlers
  },

  computed: {
    ...mapState(["settings"]),

    show() {
      return !!this.settings.show_sidebar && !!this.settings.sidebar_block;
    }
  }
};
</script>
