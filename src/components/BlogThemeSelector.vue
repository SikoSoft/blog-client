<template>
  <select v-if="contextIsReady(context)" @change="change">
    <option
      v-for="theme of themes"
      :key="theme.id"
      :selected="value === theme.id"
      :value="theme.id"
      >{{ theme.name }}</option
    >
  </select>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blog-theme-selector",

  props: {
    value: String
  },

  data() {
    return {
      context: { id: "needs", props: ["themes"] },
      setup: false
    };
  },

  created() {
    this.addContext(this.context);
  },

  updated() {
    if (this.themesLink) {
      this.update();
    }
  },

  beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["links"]),

    ...mapGetters(["contextIsReady"]),

    themesLink() {
      return this.link("GET", "themes");
    },

    themes() {
      if (this.setup) {
        const { themes } = this.setup;
        return themes;
      }
      return [];
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["addContext", "removeContext", "apiRequest"]),

    async update() {
      if (!this.setup) {
        this.setup = true;
        this.setup = await this.apiRequest(this.themesLink);
      }
    },

    async change(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>
