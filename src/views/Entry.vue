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
    ...mapGetters(["entries"]),
    entry: function() {
      return this.$store.getters.entryById(
        `${this.$route.params.date}/${this.$route.params.title}`
      );
    }
  },

  async mounted() {
    await this.getEntries();
    this.setBreadcrumbs([
      {
        href: `/entry/${this.entry.id}`,
        label: this.entry.title
      }
    ]);
    this.setTitle(this.entry.title);
  },

  methods: {
    ...mapActions(["getEntries", "setBreadcrumbs", "setTitle"])
  }
};
</script>
