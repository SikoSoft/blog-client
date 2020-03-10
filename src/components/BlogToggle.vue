<template>
  <div class="blog-toggle" @click="toggle">
    <div class="blog-toggle__indicator" :class="classes"></div>
  </div>
</template>

<script>
export default {
  name: "blog-toggle",

  props: ["isOn"],

  computed: {
    classes() {
      return {
        "blog-toggle__indicator--on": this.isOn,
        "blog-toggle__indicator--off": !this.isOn
      };
    }
  },

  methods: {
    toggle() {
      this.$parent.value = this.$parent.value === 1 ? 0 : 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-toggle {
  height: 2rem;
  background: radial-gradient(#bbb, #fefefe);
  border: 2px #ddd solid;
  border-radius: 1rem;
  width: 3.6rem;
  position: relative;
  cursor: pointer;

  .blog-toggle__indicator {
    position: absolute;
    top: 0.1rem;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 1rem;
    box-sizing: border-box;
    transition: all 0.3s;

    &--off {
      opacity: 0.35;
      left: 0.1rem;
      background: radial-gradient(#943d37, #541313);
      border: 2px #460207 solid;
    }

    &--on {
      opacity: 1;
      left: 1.7rem;
      background: radial-gradient(#37943e, #13542d);
      border: 2px #035026 solid;
    }
  }
}
</style>
