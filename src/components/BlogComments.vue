<template>
  <div class="blog-comments">
    <h3 class="blog-comments__head">{{ $strings.comments }}</h3>
    <div class="blog-comments__list">
      <blog-comment v-bind="comment" v-for="comment in comments" :key="comment.id" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BlogComment from "@/components/BlogComment.vue";

export default {
  name: "blog-comments",

  components: { BlogComment },

  props: ["entry"],

  mounted() {
    this.getComments({ id: this.entry.id });
  },

  computed: {
    comments() {
      return this.$store.state.comments[this.entry.id]
        ? this.$store.state.comments[this.entry.id]
        : [];
    }
  },

  methods: {
    ...mapActions(["getComments"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.blog-comments {
  &__head {
    margin-top: $space-xlarge;
    padding-top: $space-xlarge;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
