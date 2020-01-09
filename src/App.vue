<template>
  <div id="app">
    <header>
      <blog-header />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import BlogHeader from "./components/BlogHeader.vue";

export default {
  components: { BlogHeader }
};
</script>

<style lang="scss" src="./styles/theme.scss"></style>
