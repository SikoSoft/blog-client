<template>
  <div class="blog-hero">
    <div class="blog-hero__image" :style="{ 'background-size': `auto ${imgSize}px` }"></div>
    <h2 class="blog-hero__heading" :style="{ opacity: headingOpacity }">{{ title }}</h2>
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
