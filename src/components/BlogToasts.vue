<template>
  <ul class="blog-toasts">
    <li v-for="toast in toasts" :key="toast.id">{{ toast.message }}</li>
  </ul>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "blog-toasts",

  computed: {
    ...mapState(["toasts"])
  }
};
</script>

<style lang="scss" scoped>
.blog-toasts {
  position: fixed;
  bottom: 0;
  left: 0;
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;
  width: 100%;
  font-size: 1.5rem;

  li {
    margin: 0.5rem;
    text-shadow: 0 0 5px #000;
  }
}
</style>
