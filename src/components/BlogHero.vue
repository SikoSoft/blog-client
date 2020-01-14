<template>
  <div class="blog-hero">
    <div class="blog-hero__image"></div>
    <h2 class="blog-hero__heading">{{ title }}</h2>
    <div class="blog-hero__caption"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "blog-hero",

  computed: {
    ...mapGetters(["title"])
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.blog-hero {
  position: relative;
  height: 400px;
  background: radial-gradient(circle at center, #333 0, #000);

  &__image {
    opacity: 0.2;
    height: 100%;
    width: 100%;
    background-image: url("http://www.sikosoft.com/img/pepperSpray.png");
    background-position: right top;
    background-size: auto 1000px;
    background-repeat: no-repeat;
  }

  &__heading {
    position: absolute;
    margin: 0;
    top: 30%;
    left: 2rem;
    font-size: 8rem;
    text-shadow: 0 0 10px #000;
  }
}
</style>
