<template>
  <div class="tags">
    <blog-tags :tags="tags" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BlogTags from "@/components/BlogTags";

export default {
  name: "tags",

  components: { BlogTags },

  mounted() {
    this.initialize().then(() => {
      this.getTags();
      this.setTitle(this.$strings.tags);
      this.setBreadcrumbs([{ href: "/tags", label: this.$strings.tags }]);
    });
  },

  computed: {
    ...mapState(["tags"])
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle", "getTags"])
  }
};
</script>
