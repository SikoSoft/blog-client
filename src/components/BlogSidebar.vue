<template>
  <aside class="blog-sidebar">
    <blog-github-feed :feed="feed" />
  </aside>
</template>

<script>
import { mapGetters } from "vuex";

import BlogGithubFeed from "@/components/BlogGithubFeed.vue";

export default {
  name: "blog-sidebar",

  components: { BlogGithubFeed },

  data() {
    return {
      feed: []
    };
  },

  mounted() {
    fetch(this.settings.github_feed)
      .then(response => response.json())
      .then(json => {
        this.feed = json;
      });
  },

  computed: {
    ...mapGetters(["settings"])
  }
};
</script>

<style lang="scss" scoped></style>
