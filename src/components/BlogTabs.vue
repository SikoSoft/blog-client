<template>
  <div class="blog-tabs">
    <nav class="blog-tabs__navigation">
      <ul>
        <li
          v-for="(tab, index) in tabs"
          :key="tab.title"
          @click="selectTab(index)"
          :class="{ active: index === activeTab }"
        >
          {{ tab.title }}
        </li>
      </ul>
    </nav>
    <div class="blog-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "blog-tabs",

  data() {
    return {
      activeTab: 0,
      tabs: []
    };
  },

  mounted() {
    this.tabs = this.$children;
    this.selectTab(0);
  },

  methods: {
    selectTab(index) {
      this.activeTab = index;
      this.tabs.forEach((tab, tabIndex) => {
        tab.isActive = tabIndex === index;
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables";

.blog-tabs {
  transition: all 0.3s;

  &__navigation {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        display: inline-block;
        padding: $space;
        opacity: 0.7;
        cursor: pointer;
        font-weight: bold;

        &.active {
          opacity: 1;
          background-color: $color-bg-primary;
        }
      }
    }
  }

  &__content {
    padding: $space;
    background-color: $color-bg-primary;
  }
}
</style>
