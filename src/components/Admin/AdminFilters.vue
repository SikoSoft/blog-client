<template>
  <div class="admin-filters">
    <ul class="admin-filters__list">
      <admin-filter v-for="filter in filters" :key="filter.id" :initial="filter" />
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import AdminFilter from "@/components/Admin/AdminFilter.vue";

export default {
  name: "filters",

  components: { AdminFilter },

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
  &__list {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
