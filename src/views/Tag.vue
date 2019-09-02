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
  },

  methods: {
    ...mapActions(["getEntriesByTag"])
  },

  computed: {
    ...mapGetters(["entriesByTag"])
  }
};
</script>