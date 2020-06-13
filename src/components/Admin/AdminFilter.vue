<template>
  <li class="admin-filter">
    <div class="admin-filter__col">
      <input
        class="admin-filter__input"
        :class="{ 'admin-filter__input--unsaved': initial.id !== id }"
        :placeholder="$strings.id"
        type="text"
        v-model="id"
        @keydown="handleUpdate"
      />
    </div>
    <div class="admin-filter__col">
      <input
        class="admin-filter__input"
        :class="{ 'admin-filter__input--unsaved': initial.label !== label }"
        :placeholder="$strings.title"
        type="text"
        v-model="label"
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

  props: ["initial"],

  data() {
    return {
      id: this.initial.id,
      label: this.initial.label,
      image: this.initial.image
    };
  },

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
    &--unsaved {
      border: 2px $color-action-neutral-bg solid;
    }
  }
}
</style>
