<template>
  <aside class="blog-sidebar" v-if="show">
    <blog-block-injector :id="settings.sidebar_block" />
  </aside>
</template>

<script>
import { mapState } from "vuex";
import BlogBlockInjector from "@/components/BlogBlockInjector";

export default {
  name: "blog-sidebar",

  components: { BlogBlockInjector },

  mounted() {},

  computed: {
    ...mapState(["settings"]),

    show() {
      return !!this.settings.show_sidebar && !!this.settings.sidebar_block;
    }
  }
};
</script>
