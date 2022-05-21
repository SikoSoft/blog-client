<template>
  <div class="tags">
    <blog-tags :tags="tags" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BlogTags from "@/components/BlogTags";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "tags",

  components: { BlogTags },

  async mounted() {
    await this.initialize();
    this.getTags();
    this.setTitle(this.$strings.tags);
    this.setBreadcrumbs([{ href: "/tags", label: this.$strings.tags }]);
  },

  computed: {
    ...mapState(["tags"])
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["initialize", "setBreadcrumbs", "setTitle", "getTags"])
  }
};
</script>
