<template>
  <div class="blog-banner">
    <div
      class="blog-banner__image"
      :style="{
        'background-size': `auto ${imgSize}%`,
        ...(image ? { 'background-image': `url(${image})` } : {})
      }"
    ></div>
    <div class="blog-banner__text">
      <h1 class="blog-banner__heading" :style="{ opacity: headingOpacity }">
        {{ title }}
      </h1>
      <div class="blog-banner__caption">{{ caption }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "blog-banner",

  props: {
    caption: String,
    image: String
  },

  data() {
    return {
      imgSize: 100,
      headingOpacity: 1
    };
  },

  computed: {
    ...mapState(["title"])
  },

  mounted() {
    window.addEventListener("scroll", () => {
      const height = 400;
      const dif = window.pageYOffset < height ? height - window.pageYOffset : 0;
      const difRatio = dif / height;
      const scale = (1 + (1 - difRatio) * 0.25) * 100;
      this.imgSize = scale;
      this.headingOpacity = difRatio;
    });
  }
};
</script>

<style lang="scss">
@import "@theme/variables";
@import "@theme/mixins";

.blog-banner {
  @include container-width;
  padding: 0;
  position: relative;
  height: 400px;
  background: radial-gradient(
    circle at center,
    $color-banner-bg-primary 0,
    $color-banner-bg-secondary
  );

  &__image {
    opacity: 0.2;
    height: 100%;
    width: 100%;
    background-position: right top;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  &__text {
    position: absolute;
    max-width: 90vw;
    margin: 0 2rem;
    top: 20%;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-shadow: 0 0 10px $color-text-shadow;
  }

  &__heading {
    font-size: 6rem;
    margin-bottom: 0;
  }

  &__caption {
    font-size: 2rem;
  }
}
</style>
