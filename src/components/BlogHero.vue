<template>
  <div class="blog-hero">
    <div class="blog-hero__image" :style="{ 'background-size': `auto ${imgSize}px` }"></div>
    <h1 class="blog-hero__heading" :style="{ opacity: headingOpacity }">{{ title }}</h1>
    <div class="blog-hero__caption"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "blog-hero",

  data() {
    return {
      imgSize: 1000,
      headingOpacity: 1
    };
  },

  computed: {
    ...mapGetters(["title"])
  },

  mounted() {
    window.addEventListener("scroll", () => {
      const height = 400;
      const dif = window.pageYOffset < height ? height - window.pageYOffset : 0;
      const difRatio = dif / height;
      const imgMin = 1000;
      const imgMax = 1200;
      this.imgSize = imgMin + (imgMax - imgMin) * ((height - dif) / height);
      this.headingOpacity = difRatio;
    });
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
    background-image: url("http://sikosoft.com/img/pepperSpray.png");
    background-position: right top;
    background-size: auto 1000px;
    background-repeat: no-repeat;
  }

  &__heading {
    position: absolute;
    max-width: 90vw;
    margin: 0;
    top: 20%;
    left: 2rem;
    font-size: 6rem;
    line-height: 7rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-shadow: 0 0 10px #000;
  }
}
</style>
