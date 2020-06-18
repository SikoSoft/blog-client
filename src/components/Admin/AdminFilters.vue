<template>
  <div class="admin-filters">
    <div class="admin-filters__show-id">
      <div class="admin-filters__show-id-toggle">
        <blog-toggle v-model="showId" />
      </div>
      <div class="admin-filters__show-id-label">{{ $strings.showIdField }}</div>
    </div>
    <fieldset class="admin-filters__saved">
      <legend></legend>
      <ul class="admin-filters__list">
        <admin-filter
          v-for="filter in filters"
          :key="filter.id"
          :initial="filter"
          :showId="showId"
        />
      </ul>
    </fieldset>
    <fieldset class="admin-filters__new">
      <legend>{{ $strings.newFilter }}</legend>
      <admin-filter key="new" :showId="showId" />
    </fieldset>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import AdminFilter from "@/components/Admin/AdminFilter.vue";
import BlogToggle from "@/components/BlogToggle.vue";

export default {
  name: "filters",

  components: { BlogToggle, AdminFilter },

  data() {
    return {
      showId: false
    };
  },

  computed: {
    ...mapGetters(["filters"])
  },

  methods: {
    ...mapActions(["getFilters"])
  },

  mounted() {
    this.getFilters().then(() => {});
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.admin-filters {
  &__show-id {
    display: flex;
    margin-bottom: $space-xlarge;

    &-toggle,
    &-label {
      display: inline-block;
      padding-right: 1rem;
      vertical-align: middle;
      line-height: 2rem;
    }
  }

  &__list {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__saved {
    border-color: transparent;
  }
  &__new {
    border-radius: 1rem;
    border-color: $color-border-primary;
  }
}
</style>
