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
      <ul class="admin-filters__list" :class="{ 'admin-filters__list--dragging': isDragging }">
        <li
          :data-id="filter.id"
          class="admin-filters__list-item"
          v-for="filter in filters"
          :key="filter.id"
          draggable="true"
          @dragenter="dragEnter"
          @dragleave="dragLeave"
          @dragover="dragOver"
          @dragstart="dragStart"
          @dragend="dragEnd"
          @drop="drop"
        >
          <admin-filter :initial="filter" :showId="showId" />
        </li>
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
      showId: false,
      isDragging: false,
      draggedFilter: null,
      droppedFilter: null,
      orderedFilters: []
    };
  },

  computed: {
    ...mapGetters(["filters"])
  },

  methods: {
    ...mapActions(["getFilters", "setFilterOrder"]),

    dragEnter(e) {
      e.currentTarget.classList.add("admin-filters__list-item--over");
    },

    dragLeave(e) {
      e.currentTarget.classList.remove("admin-filters__list-item--over");
    },

    dragOver(e) {
      e.preventDefault();
    },

    dragStart(e) {
      this.isDragging = true;
      this.draggedFilter = e.target;
      e.target.classList.add("admin-filters__list-item--moving");
      this.orderedFilters = this.filters.map(filter => filter.id);
    },

    dragEnd() {
      const draggedId = this.draggedFilter.getAttribute("data-id");
      const draggedIndex = this.orderedFilters.indexOf(draggedId);
      const droppedIndex = this.orderedFilters.indexOf(
        this.droppedFilter.getAttribute("data-id")
      );
      this.draggedFilter.classList.remove("admin-filters__list-item--moving");
      const orderedFilters =
        draggedIndex === droppedIndex
          ? this.orderedFilters
          : this.orderedFilters.filter(filterId => filterId !== draggedId);
      if (draggedIndex !== droppedIndex) {
        orderedFilters.splice(droppedIndex, 0, draggedId);
      }
      this.droppedFilter.classList.remove("admin-filters__list-item--over");
      this.isDragging = false;
      if (
        JSON.stringify(this.orderedFilters) !== JSON.stringify(orderedFilters)
      ) {
        this.setFilterOrder({ orderedFilters });
      }
    },

    drop(e) {
      this.droppedFilter = e.target;
    }
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
    transform: all 0.3s;

    &--dragging li * {
      pointer-events: none;
    }

    &-item {
      transition: all 0.3s;
      cursor: move;
      border: 0.25rem transparent solid;
      border-radius: 1rem;

      &--moving {
        transform: scale(0.8);
        opacity: 0.8;
      }

      &--over {
        border: 0.25rem $color-border-primary dashed;
        opacity: 0.9;
      }
    }
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
