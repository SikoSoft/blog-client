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
    console.log("updated");
    this.getEntriesByTag(this.tag);
    this.setBreadcrumbs([
      { href: "/tags", label: this.$strings.tags },
      { href: `/tag/${this.tag}`, label: this.tag }
    ]);
  },

  computed: {
    ...mapGetters(["entriesByTag"])
  },

  methods: {
    ...mapActions(["getEntriesByTag", "setBreadcrumbs"])
  }
};
</script>