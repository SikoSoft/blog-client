<template>
  <div class="admin-filter-rules">
    <ul class="admin-filter-rules__list">
      <li v-for="rule in rules" :key="id(rule)"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "admin-filter-rules",

  props: ["rules"],

  methods: {
    id(rule) {
      return `${rule.filter_id}-${rule.type}-${rule.value}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.admin-filter-rules {
  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
