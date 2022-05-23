<template>
  <div class="blog-progress-bar">
    <div class="blog-progress-bar__total"></div>
    <div class="blog-progress-bar__progress" :style="progressWidth"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "blog-progress-bar",

  computed: {
    ...mapState(["progress"]),

    progressWidth() {
      return {
        width: `${this.progress * 100}%`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-progress-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  &__total {
    position: relative;
    height: 1rem;
    width: 100%;
    background-color: #777;
  }

  &__progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(to right, #400, #622);
    border: 1px #733 solid;
    transition: all 0.1s;
    box-sizing: border-box;
  }
}
</style>
