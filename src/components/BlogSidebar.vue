<template>
  <aside class="blog-sidebar" v-if="show">
    <blog-at-a-glance v-if="filters.length" :filters="filters" />
    <blog-block
      :context="[
        { type: 'setting_is_not', payload: { id: 'github_feed', value: '' } }
      ]"
    >
      <blog-github-feed v-if="feed.length" :feed="feed" />
    </blog-block>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import BlogBlock from "@/components/BlogBlock.vue";
import BlogAtAGlance from "@/components/BlogAtAGlance.vue";
import BlogGithubFeed from "@/components/BlogGithubFeed.vue";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blog-sidebar",

  components: { BlogAtAGlance, BlogGithubFeed, BlogBlock },

  props: {
    filters: Array
  },

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

  methods: {
    ...linkHandlers
  },

  computed: {
    ...mapState(["settings"]),

    show() {
      if (this.feed.length || this.filters.length) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
