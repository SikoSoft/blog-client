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
import { mapGetters, mapActions } from "vuex";
import BlogBlock from "@/components/BlogBlock.vue";
import BlogAtAGlance from "@/components/BlogAtAGlance.vue";
import BlogGithubFeed from "@/components/BlogGithubFeed.vue";

export default {
  name: "blog-sidebar",

  components: { BlogAtAGlance, BlogGithubFeed, BlogBlock },

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
      if (this.feed.length || this.filters.length) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
