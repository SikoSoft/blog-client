<template>
  <div class="home">
    <blog-entries :entries="entries" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import BlogEntries from "@/components/BlogEntries.vue";

export default {
  name: "home",

  components: { BlogEntries },

  mounted() {
    this.setTitle(this.$config.siteName);
    this.initialize().then(() => {
      this.getEntries();
    });
    this.setBreadcrumbs([]);
  },

  methods: {
    ...mapActions(["initialize", "getEntries", "setBreadcrumbs", "setTitle"])
  },

  computed: {
    ...mapGetters(["entries"])
  }
};
</script>
