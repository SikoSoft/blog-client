<template>
  <div class="entry">
    <blog-entry v-if="entry" v-bind="entry" :fullMode="true" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BlogEntry from "@/components/BlogEntry.vue";

export default {
  name: "entry",

  components: { BlogEntry },

  computed: {
    entry: function() {
      return this.$store.getters.entryById(`${this.$route.params.id}`);
    }
  },

  mounted() {
    this.initialize().then(() => {
      this.getEntries().then(() => {
        this.setBreadcrumbs([
          {
            href: `/entry/${this.entry.id}`,
            label: this.entry.title
          }
        ]);
        this.setTitle(this.entry.title);
      });
    });
  },

  methods: {
    ...mapActions(["initialize", "getEntries", "setBreadcrumbs", "setTitle"])
  }
};
</script>
