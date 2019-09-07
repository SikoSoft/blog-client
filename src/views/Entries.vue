<template>
  <div class="home">
    <blog-entries :entries="entries" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";

import BlogEntries from "@/components/BlogEntries.vue";

export default {
  name: "home",

  components: { BlogEntries },

  mounted() {
    this.getEntries();
  },

  methods: {
    ...mapActions(["getEntries"])
  },

  computed: {
    ...mapGetters(["entries"])
  }
};
</script>
