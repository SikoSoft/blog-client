<template>
  <div class="blog-at-a-glance" v-if="ready">
    <h3 class="blog-at-a-glance__head">{{ $strings.atAGlance }}</h3>
    <ul class="blog-at-a-glance__list">
      <li
        v-for="filter in filters"
        :key="filter.id"
        class="blog-at-a-glance__filter"
      >
        <router-link :to="`/filter/${filter.id}`">
          <img
            v-if="filter.image"
            :src="filter.image"
            class="blog-at-a-glance__filter-image"
          />
          {{ filter.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blog-at-a-glance",

  data() {
    return {
      context: { id: "needs", props: ["filters"] },
      filterLinks: [],
      firstUpdate: true
    };
  },

  async created() {
    this.filterLinks = await this.addContext(this.context);
  },

  mounted() {
    this.update();
  },

  updated() {
    this.update();
  },

  async beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["filters"]),

    ...mapGetters(["contextIsReady"]),

    ready() {
      return this.getLink || this.contextIsReady(this.context);
    },

    getLink() {
      return this.link("GET", "filters", this.filterLinks);
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["getFilters", "addContext", "removeContext"]),

    async update() {
      if (
        this.ready &&
        this.firstUpdate &&
        this.getLink &&
        !this.filters.length
      ) {
        this.firstUpdate = false;
        this.getFilters({ link: this.getLink });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@theme/mixins";

.blog-at-a-glance {
  @include sidebar-block;

  &__filter-image {
    width: 96px;
    height: 54px;
    vertical-align: middle;
    margin-right: 1rem;
  }
}
</style>
