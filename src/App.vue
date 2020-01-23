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
  components: { BlogHeader },

  mounted() {
    this.$router.afterEach(() => {
      window.scroll({
        top:
          document.getElementById("blog-breadcrumb").getBoundingClientRect()
            .top + window.scrollY,
        left: 0,
        behavior: "smooth"
      });
    });

    window.addEventListener("click", event => {
      let { target } = event;
      while (target && target.tagName !== "A") {
        target = target.parentNode;
      }
      if (target && [...target.classList].includes("vue-route")) {
        const {
          altKey,
          ctrlKey,
          metaKey,
          shiftKey,
          button,
          defaultPrevented
        } = event;
        if (metaKey || altKey || ctrlKey || shiftKey) {
          return;
        }
        if (defaultPrevented) {
          return;
        }
        if (button !== undefined && button !== 0) {
          return;
        }
        if (target && target.getAttribute) {
          const linkTarget = target.getAttribute("target");
          if (/\b_blank\b/i.test(linkTarget)) {
            return;
          }
        }
        const url = new URL(target.href);
        const to = url.pathname;
        if (window.location.pathname !== to && event.preventDefault) {
          event.preventDefault();
          this.$router.push(to);
        }
      }
    });
  }
};
</script>

<style lang="scss" src="./styles/theme.scss"></style>
