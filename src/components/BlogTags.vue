<template>
  <div class="blog-tags">
    <ul class="blog-tags__list">
      <li class="blog-tags__tag" v-for="tag in tags" :key="tag">
        <router-link class="blog-tags__tag-link" :to="`/tag/${tag}`">
          {{ tag }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "blog-tags",

  props: {
    tags: { type: Array }
  },

  computed: {}
};
</script>

<style lang="scss" scoped>
.blog-tags {
  .blog-tags__list {
    list-style: none;
  }

  .blog-tags__tag {
    display: inline-block;
    font-size: 3rem;
    margin-right: 2rem;
  }
}
</style>
