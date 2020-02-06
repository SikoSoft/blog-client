<template>
  <div class="blog-comments">
    <h3 class="blog-comments__head">{{ $strings.comments }}</h3>
    <div class="blog-comments__list">
      <blog-comment v-bind="comment" v-for="comment in comments" :key="comment.id" />
    </div>
    <div
      class="blog-comments__buttons"
      :class="{ 'blog-comments__buttons--active': selectedComments.length }"
    >
      <button @click="publishComments" class="blog-comments__publish">{{ $strings.publish }}</button>
      <button @click="deleteComments" class="blog-comments__delete">{{ $strings.delete }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BlogComment from "@/components/BlogComment.vue";

export default {
  name: "blog-comments",

  components: { BlogComment },

  props: ["entry"],

  mounted() {
    this.getComments({ id: this.entry.id });
  },

  computed: {
    ...mapGetters(["selectedComments"]),

    comments() {
      return this.$store.state.comments[this.entry.id]
        ? this.$store.state.comments[this.entry.id]
        : [];
    }
  },

  methods: {
    ...mapActions(["getComments", "publishComments", "deleteComments"])
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

  &__buttons {
    opacity: 0;
    position: fixed;
    bottom: -5rem;
    left: 0;
    width: 100%;
    height: 5rem;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.9);
    border-top: 3px rgba(50, 50, 50, 0.9) solid;
    transition: all 0.3s;

    &--active {
      opacity: 1;
      bottom: 0;
    }

    button {
      margin: 1rem;
      font-size: 2rem;
      height: 3rem;
      line-height: 1.5rem;
    }
  }

  &__publish {
    color: $color-action-create-text;
    background-color: $color-action-create-bg;
  }

  &__delete {
    color: $color-action-destroy-text;
    background-color: $color-action-destroy-bg;
  }
}
</style>
