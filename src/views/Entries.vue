<template>
  <div class="home">
    <blog-loader v-if="isLoading" />
    <blog-entries :entries="entries" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import BlogLoader from "@/components/BlogLoader.vue";
import BlogEntries from "@/components/BlogEntries.vue";

export default {
  name: "home",

  components: { BlogLoader, BlogEntries },

  mounted() {
    this.setTitle(process.env.VUE_APP_SITE_NAME);
    this.initialize().then(() => {
      this.getEntries();
    });
    this.setBreadcrumbs([]);
  },

  methods: {
    ...mapActions(["initialize", "getEntries", "setBreadcrumbs", "setTitle"])
  },

  computed: {
    ...mapGetters(["entries", "isLoading"])
  }
};
</script>
