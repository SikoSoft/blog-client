<template>
  <div class="blog-at-a-glance">
    <h3 class="blog-at-a-glance__head">{{ $strings.atAGlance }}</h3>
    <ul class="blog-at-a-glance__list">
      <li v-for="filter in filters" :key="filter.id">
        <router-link :to="`/filter/${filter.id}`">
          {{
          filter.label
          }}
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
}
</style>
