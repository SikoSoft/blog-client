<template>
  <div id="app">
    <header>
      <blog-header />
    </header>
    <div class="main-container">
      <main>
        <router-view />
      </main>
      <blog-sidebar v-if="initialized" />
    </div>
    <blog-toasts />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import BlogHeader from "./components/BlogHeader.vue";
import BlogToasts from "./components/BlogToasts.vue";
import BlogSidebar from "./components/BlogSidebar.vue";

export default {
  components: { BlogHeader, BlogToasts, BlogSidebar },

  mounted() {
    this.$router.afterEach(to => {
      window.scroll({
        top:
          document.getElementById("blog-breadcrumb").getBoundingClientRect()
            .top + window.scrollY,
        left: 0,
        behavior: "smooth"
      });
      if (
        process.env.NODE_ENV === "production" &&
        process.env.VUE_APP_TRACKING_CODE
      ) {
        window.gtag("config", process.env.VUE_APP_TRACKING_CODE, {
          page_path: to.path
        });
      }
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
  },

  computed: {
    ...mapGetters(["initialized"])
  }
};
</script>

<style lang="scss" src="./styles/theme.scss"></style>
