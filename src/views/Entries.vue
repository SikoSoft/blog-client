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
    this.getEntries();
    this.setBreadcrumbs([]);
  },

  methods: {
    ...mapActions(["getEntries", "setBreadcrumbs"])
  },

  computed: {
    ...mapGetters(["entries"])
  }
};
</script>
