<template>
  <div class="blog-at-a-glance">
    <h3 class="blog-at-a-glance__head">{{ $strings.atAGlance }}</h3>
    <ul class="blog-at-a-glance__list">
      <li v-for="filter in filters" :key="filter.id" class="blog-at-a-glance__filter">
        <router-link :to="`/filter/${filter.id}`">
          <img v-if="filter.image" :src="filter.image" class="blog-at-a-glance__filter-image" />
          {{ filter.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "blog-at-a-glance",

  props: ["filters"]
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.blog-at-a-glance {
  @include sidebar-block;

  &__filter {
    margin: 4px 0;
  }

  &__filter-image {
    width: 96px;
    height: 54px;
    vertical-align: top;
    margin-right: 1rem;
  }
}
</style>
