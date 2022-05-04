<template>
  <select @change="change">
    <option value="0">{{ $strings.selectARole }}</option>
    <option
      v-for="r in roles"
      :key="r.id"
      :value="r.id"
      :selected="r.id === role"
      >{{ r.name }}</option
    >
  </select>
</template>

<script>
export default {
  name: "blog-role-selector",

  props: ["role"],

  data() {
    return {
      value: 0
    };
  },

  computed: {
    roles() {
      return this.$store.state.roles;
    }
  },

  methods: {
    change(e) {
      this.$emit("change", e.target.value);
    }
  }
};
</script>
