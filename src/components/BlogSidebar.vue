<template>
  <aside class="blog-sidebar" v-if="show">
    <blog-at-a-glance v-if="filters.length" :filters="filters" />
    <blog-github-feed v-if="feed.length" :feed="feed" />
  </aside>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import BlogAtAGlance from "@/components/BlogAtAGlance.vue";
import BlogGithubFeed from "@/components/BlogGithubFeed.vue";

export default {
  name: "blog-sidebar",

  components: { BlogAtAGlance, BlogGithubFeed },

  data() {
    return {
      feed: []
    };
  },

  mounted() {
    this.getFilters();
    if (this.settings.github_feed) {
      fetch(this.settings.github_feed)
        .then(response => response.json())
        .then(json => {
          this.feed = json;
        });
    }
  },

  methods: {
    ...mapActions(["getFilters"])
  },

  computed: {
    ...mapGetters(["settings", "links", "filters"]),

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
