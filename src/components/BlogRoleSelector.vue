<template>
  <select @change="change">
    <option value="0" :selected="0 === value">{{
      $strings.selectARole
    }}</option>
    <option
      v-for="r in roles"
      :key="r.id"
      :value="r.id"
      :selected="r.id === value"
      >{{ r.name }}</option
    >
  </select>
</template>

<script>
export default {
  name: "blog-role-selector",

  props: { value: { type: String } },

  computed: {
    roles() {
      return this.$store.state.roles;
    }
  },

  methods: {
    change(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>
