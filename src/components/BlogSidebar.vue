<template>
  <aside class="blog-sidebar" v-if="show">
    <blog-github-feed v-if="feed.length" :feed="feed" />
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
    if (this.settings.github_feed) {
      fetch(this.settings.github_feed)
        .then(response => response.json())
        .then(json => {
          this.feed = json;
        });
    }
  },

  computed: {
    ...mapGetters(["settings"]),

    show() {
      if (this.feed.length) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
