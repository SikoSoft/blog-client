<template>
  <div>
    <slot :inContext="inContext" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "blog-context",

  props: ["rules"],

  computed: {
    ...mapState(["settings"]),

    inContext() {
      return this.rules.every(rule => {
        return this.meetsRule(rule);
      });
    }
  },

  methods: {
    meetsRule(rule) {
      switch (rule.type) {
        case "setting_is":
          return this.settings[rule.payload.id] === rule.payload.value;
        case "setting_is_not":
          return this.settings[rule.payload.id] !== rule.payload.value;
        default:
          return false;
      }
    }
  },

  render() {
    return "";
  }
};
</script>
