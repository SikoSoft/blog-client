<template>
  <div class="blog-comments" v-if="entryComments.length">
    <h3 class="blog-comments__head">{{ $strings.comments }}</h3>
    <div class="blog-comments__list">
      <blog-comment
        v-bind="comment"
        v-for="comment in comments"
        :key="comment.id"
      />
    </div>
    <div
      class="blog-comments__buttons"
      :class="{ 'blog-comments__buttons--active': selectedComments.length }"
    >
      <blog-button
        v-if="entry.links.publishComments"
        create
        :action="publishComments"
        :text="$strings.publish"
      />
      <blog-button
        v-if="entry.links.deleteComments"
        destroy
        :action="deleteComments"
        :text="$strings.delete"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import BlogComment from "@/components/BlogComment.vue";
import BlogButton from "@/components/BlogButton.vue";

export default {
  name: "blog-comments",

  components: { BlogComment, BlogButton },

  props: {
    entry: { type: Object }
  },

  mounted() {
    this.getComments({ entryId: this.entry.id }).then(() => {
      this.$emit("commentsLoaded");
    });
  },

  computed: {
    ...mapState(["selectedComments", "comments"]),

    entryComments() {
      return this.$store.getters.commentsByEntry(this.entry.id);
    }
  },

  methods: {
    ...mapActions(["getComments", "apiRequest", "addToast"]),

    ...mapMutations(["setSelectedComments", "setComment", "deleteComment"]),

    async publishComments() {
      await this.apiRequest({
        ...this.entry.links.publishComments,
        body: JSON.stringify({ ids: this.selectedComments })
      });
      this.selectedComments.forEach(commentId => {
        if (this.comments[commentId]) {
          this.setComment({
            id: commentId,
            comment: {
              ...this.comments[commentId],
              public: 1
            }
          });
        }
      });
      this.setSelectedComments({ comments: [] });
      this.addToast(this.$strings.commentsPublished);
    },

    async deleteComments() {
      await this.apiRequest({
        ...this.entry.links.deleteComments,
        body: JSON.stringify({ ids: this.selectedComments })
      });
      this.selectedComments.forEach(commentId => {
        this.deleteComment({ id: commentId });
      });
      this.setSelectedComments({ comments: [] });
      this.addToast(this.$strings.commentsDeleted);
    }
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
}
</style>
