<template>
  <div id="app" :class="classes">
    <blog-admin v-if="showAdminPane" :links="[link('POST', 'entry')]" />
    <header>
      <blog-header />
    </header>
    <div
      class="main-container"
      :class="{ 'main-container--loading': isLoading }"
    >
      <main>
        <blog-loader v-if="isLoading" />
        <router-view :links="routeLinks" />
      </main>
      <blog-sidebar v-if="showSidebar" :filters="filters" />
    </div>
    <blog-toasts />
    <blog-progress-bar v-if="showProgressBar" />
    <blog-footer />
    <blog-overlay />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import BlogOverlay from "@/components/BlogOverlay";
import BlogAdmin from "@/components/BlogAdmin";
import BlogLoader from "@/components/BlogLoader";
import BlogHeader from "@/components/BlogHeader";
import BlogFooter from "@/components/BlogFooter";
import BlogToasts from "@/components/BlogToasts";
import BlogSidebar from "@/components/BlogSidebar";
import BlogProgressBar from "@/components/BlogProgressBar";
import linkHandlers from "@/shared/linkHandlers.js";

export default {
  components: {
    BlogAdmin,
    BlogLoader,
    BlogHeader,
    BlogFooter,
    BlogToasts,
    BlogSidebar,
    BlogProgressBar,
    BlogOverlay
  },

  data() {
    return {
      fetched: false,
      viewsWithSidebar: ["entry", "entries", "draft", "tag", "entries-filter"]
    };
  },

  mounted() {
    this.$router.afterEach(to => {
      if (!to.hash.match("#comment-")) {
        window.scroll({
          top:
            document.getElementById("blog-breadcrumb").getBoundingClientRect()
              .top + window.scrollY,
          left: 0,
          behavior: "smooth"
        });
      }
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
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    ...mapState([
      "initialized",
      "isLoading",
      "settings",
      "showProgressBar",
      "links",
      "filters"
    ]),

    classes() {
      return {
        "app--has-admin-pane": this.showAdminPane
      };
    },

    showAdminPane() {
      return this.initialized && this.links && this.link("POST", "entry");
    },

    showSidebar() {
      return (
        this.initialized &&
        this.settings.show_sidebar &&
        this.viewsWithSidebar.includes(this.$route.name)
      );
    },

    routeLinks() {
      return this.linksByEntity(this.$route.name);
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["apiRequest"]),

    ...mapMutations(["setFilters", "setContextInitialized"]),

    async getFilters() {
      const link = this.link("GET", "filters");
      if (link) {
        const { filters } = await this.apiRequest(link);
        this.setFilters({ filters });
      }
    },

    update() {
      if (!this.fetched && this.links) {
        this.getFilters();
        this.fetched = true;
      }
    }
  }
};
</script>

<style lang="scss" src="./styles/theme.scss"></style>
