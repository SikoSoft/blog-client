<template>
  <div class="blog-github-feed">
    <h3 class="blog-github-feed__head">{{ $strings.githubFeed }}</h3>
    <ul class="blog-github-feed__list">
      <blog-github-event
        v-for="event in filteredFeed"
        v-bind="event"
        :key="event.id"
      />
    </ul>
  </div>
</template>

<script>
import BlogGithubEvent from "@/components/BlogGithubEvent";

export default {
  name: "blog-github-feed",

  props: { feed: { type: Array } },

  components: { BlogGithubEvent },

  computed: {
    filteredFeed() {
      return this.feed.filter(
        event => !!this.$strings.githubEventTypes[event.type]
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@theme/variables";
@import "@theme/mixins";
@import "@theme/theme";

.blog-github-feed {
  @include sidebar-block;
}
</style>
