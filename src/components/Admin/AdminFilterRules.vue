<template>
  <div class="admin-filter-rules">
    <ul class="admin-filter-rules__list">
      <li v-for="rule in rules" :key="rule.id">
        <admin-filter-rule
          :filterId="filterId"
          :initial="{ ...rule }"
          :links="rule.links"
        />
      </li>
      <li>
        <admin-filter-rule :filterId="filterId" :links="links" />
      </li>
    </ul>
  </div>
</template>

<script>
import AdminFilterRule from "@/components/Admin/AdminFilterRule";

export default {
  name: "admin-filter-rules",

  components: { AdminFilterRule },

  props: {
    links: Array,
    rules: { type: Array },
    filterId: { type: String }
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
