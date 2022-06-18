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
      <blog-sortable-list @orderChanged="updateSortOrder">
        <blog-sortable-item
          v-for="filter in filters"
          :key="filter.id"
          :id="filter.id"
        >
          <admin-filter
            :initial="{ ...filter }"
            :rules="filter.rules"
            :links="filter.links"
            :showId="showId"
          />
        </blog-sortable-item>
      </blog-sortable-list>
    </fieldset>
    <fieldset class="admin-filters__new">
      <legend>{{ $strings.newFilter }}</legend>
      <admin-filter key="new" :showId="showId" :links="links" />
    </fieldset>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import AdminFilter from "@/components/Admin/Filters/Filter";
import BlogToggle from "@/components/BlogToggle";
import BlogSortableList from "@/components/BlogSortableList";
import BlogSortableItem from "@/components/BlogSortableItem";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-filters",

  components: { BlogToggle, BlogSortableList, BlogSortableItem, AdminFilter },

  props: {
    filters: Array,
    links: Array
  },

  data() {
    return {
      //initialized: false,
      showId: 0,
      isDragging: false,
      draggedFilter: null,
      droppedFilter: null,
      orderedFilters: []
    };
  },

  computed: {
    ...mapState(["filterRules"])
  },

  methods: {
    ...mapActions(["apiRequest", "addToast"]),

    ...mapMutations(["setFilters"]),

    ...linkHandlers,

    rules(filterId) {
      return (
        this.filterRules.filter(filter => filter.filter_id === filterId) || []
      );
    },

    async updateSortOrder(order) {
      const newFilters = [];
      for (const filterRow of this.filters) {
        const { filter } = await this.apiRequest({
          ...this.link("PUT", "filter", filterRow.links),
          body: { order: order.indexOf(filterRow.id.toString()) + 1 }
        });
        newFilters.push(filter);
      }
      this.setFilters({
        filters: newFilters.sort((a, b) =>
          a.order < b.order ? -1 : a.order > b.order ? 1 : 0
        )
      });
      this.addToast(this.$strings.filterOrderSaved);
    }
  }
};
</script>

<style lang="scss">
@import "@theme/variables";
@import "@theme/mixins";

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
    @include sortable-list;
  }

  &__saved {
    border-color: transparent;
  }
  &__new {
    border-radius: 1rem;
    border-color: $color-primary-border;
  }
}
</style>
