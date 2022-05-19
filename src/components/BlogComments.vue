<template>
  <div
    class="blog-comments"
    v-if="entryComments[entry.id] && entryComments[entry.id].length"
  >
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
        v-if="canPublish"
        create
        :action="publishComments"
        :text="$strings.publish"
      />
      <blog-button
        v-if="canDelete"
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
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blog-comments",

  components: { BlogComment, BlogButton },

  props: {
    entry: { type: Object }
  },

  data() {
    return {
      firstUpdate: true
    };
  },

  mounted() {
    if (this.firstUpdate) {
      this.getComments({
        links: this.entry.links,
        entryId: this.entry.id
      }).then(() => {
        this.$emit("commentsLoaded");
      });
      this.firstUpdate = false;
    }
  },

  computed: {
    ...mapState(["selectedComments", "comments", "entryComments"]),

    canPublish() {
      return (
        this.entryComments[this.entry.id] &&
        this.entryComments[this.entry.id].some(comment =>
          this.link("PUT", "comment", comment.links)
        )
      );
    },

    canDelete() {
      return (
        this.entryComments[this.entry.id] &&
        this.entryComments[this.entry.id].some(comment =>
          this.link("DELETE", "comment", comment.links)
        )
      );
    },

    commentsToProcess() {
      return this.entryComments[this.entry.id].filter(
        comment => this.selectedComments.indexOf(comment.id) > -1
      );
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["apiRequest", "getComments", "addToast"]),

    ...mapMutations(["setSelectedComments", "setComment", "deleteComment"]),

    async publishComments() {
      for (const comment of this.commentsToProcess) {
        await this.apiRequest({
          ...this.link("PUT", "comment", comment.links),
          body: { public: 1 }
        });
        this.setComment({
          id: comment.id,
          comment: {
            ...this.comments[comment.id],
            public: 1
          }
        });
      }
      this.setSelectedComments({ comments: [] });
      this.addToast(this.$strings.commentsPublished);
    },

    async deleteComments() {
      for (const comment of this.commentsToProcess) {
        await this.apiRequest(this.link("DELETE", "comment", comment.links));
        this.deleteComment({ id: comment.id });
      }
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
