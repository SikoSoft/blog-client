<template>
  <div class="blog-github-feed">
    <h3 class="blog-github-feed__head">{{ $strings.githubFeed }}</h3>
    <ul class="blog-github-feed__list">
      <blog-github-event v-for="event in feed" v-bind="event" :key="event.id" />
    </ul>
  </div>
</template>

<script>
import BlogGithubEvent from "@/components/BlogGithubEvent.vue";

export default {
  name: "blog-github-feed",

  props: ["feed"],

  components: { BlogGithubEvent }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";
@import "@/styles/theme.scss";

.blog-github-feed {
  @include sidebar-block;
}
</style>
