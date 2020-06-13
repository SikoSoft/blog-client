<template>
  <li class="admin-filter">
    <div class="admin-filter__col">
      <input
        class="admin-filter__input"
        :placeholder="$strings.id"
        type="text"
        :value="id"
        @keydown="handleUpdate"
      />
    </div>
    <div class="admin-filter__col">
      <input
        class="admin-filter__input"
        :placeholder="$strings.title"
        type="text"
        :value="label"
        @keydown="handleUpdate"
      />
    </div>
    <div class="admin-filter__col">
      <input class="admin-filter__input" :placeholder="$strings.image" type="text" :value="image" />
    </div>
  </li>
</template>

<script>
export default {
  name: "admin-filter",

  props: ["id", "label", "image"],

  methods: {
    handleUpdate() {}
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.admin-filter {
  margin: $space-small 0;
  display: flex;
  &__col {
    padding: $space-xxxsmall;

    &:first-child,
    &:nth-child(2) {
      flex: 1;
    }
    &:last-child {
      flex: 2;
    }
  }
  &__input {
    width: 100%;
    box-sizing: border-box;
    border: 2px transparent solid;
    &.admin-filters__filter-input--unsaved {
      background-color: $color-action-neutral-bg;
    }
  }
}
</style>
