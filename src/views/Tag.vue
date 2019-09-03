<template>
  <div class="tag">
    <blog-tag :tag="tag" />
    <blog-entries :entries="entriesByTag[tag]" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BlogTag from "@/components/BlogTag.vue";
import BlogEntries from "@/components/BlogEntries.vue";

export default {
  name: "tag",

  components: { BlogTag, BlogEntries },

  data() {
    return {
      tag: this.$route.params.tag
    };
  },

  mounted() {
    this.getEntriesByTag(this.tag);
    this.setBreadcrumbs([
      { url: "/tags", label: this.$strings.tags },
      { url: `/tag/${this.tag}`, label: this.tag }
    ]);
  },

  methods: {
    ...mapActions(["getEntriesByTag", "setBreadcrumbs"])
  },

  computed: {
    ...mapGetters(["entriesByTag"])
  }
};
</script>