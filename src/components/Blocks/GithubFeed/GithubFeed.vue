<template>
  <div class="blog-github-feed" v-if="feed.length">
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
import BlogGithubEvent from "@/components/Blocks/GithubFeed/GithubEvent";

export default {
  name: "blog-github-feed",

  components: { BlogGithubEvent },

  props: {
    user: String,
    eventCount: { type: Number, default: 10 }
  },

  data() {
    return {
      firstUpdate: true,
      feed: []
    };
  },

  mounted() {
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    endpoint() {
      return `https://api.github.com/users/${this.user}/events?per_page=${this.eventCount}`;
    },

    filteredFeed() {
      return this.feed.filter(
        event => !!this.$strings.githubEventTypes[event.type]
      );
    }
  },

  methods: {
    update() {
      if (this.firstUpdate && this.feed.length === 0) {
        this.firstUpdate = false;
        fetch(this.endpoint)
          .then(response => response.json())
          .then(json => {
            this.feed = json;
          });
      }
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
