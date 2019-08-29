<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <blog-header />
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import BlogHeader from "./components/BlogHeader.vue";

export default {
  components: { BlogHeader },

  mounted() {
    this.initialize();
  },

  methods: {
    ...mapActions(["initialize"])
  }
};
</script>

<style lang="scss" src="./styles/theme.scss"></style>
