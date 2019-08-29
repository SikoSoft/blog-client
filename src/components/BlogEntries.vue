<template>
  <div class="blog-entries">
    <h2>{{ title }}</h2>
    <div class="list">
      <blog-entry v-for="entry in entries" :key="entry.id" v-bind="entry" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BlogEntry from "@/components/BlogEntry.vue";

export default {
  name: "blog-entries",

  props: ["entries"],

  components: { BlogEntry },

  data() {
    return {
      title: this.$config.siteName
    };
  },

  mounted() {
    this.setTitle(this.title);
  },

  methods: mapActions(["setTitle"])
};
</script>

<style lang="scss">
.blog-entries {
  //padding: 10px;
}
</style>