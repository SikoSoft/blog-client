<template>
  <div class="entry">
    <blog-entry v-bind="entry" :fullMode="true" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BlogEntry from "@/components/BlogEntry.vue";

export default {
  name: "entry",

  components: { BlogEntry },

  computed: {
    entry: function() {
      return this.$store.getters.entryById(
        `${this.$route.params.date}/${this.$route.params.title}`
      );
    }
  },

  mounted() {
    this.getEntries();
    this.setBreadcrumbs([
      {
        href: `/entry/${this.entry.id}`,
        label: this.entry.title
      }
    ]);
  },

  methods: {
    ...mapActions(["getEntries", "setBreadcrumbs"])
  }
};
</script>
