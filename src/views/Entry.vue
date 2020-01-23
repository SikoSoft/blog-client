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

  data() {
    return {
      id: this.$route.params.id
    };
  },

  computed: {
    entry: function() {
      return this.$store.getters.entryById(this.id);
    }
  },

  created() {
    this.update();
  },

  mounted() {
    this.update();
  },

  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id;
    this.update();
    next();
  },

  methods: {
    ...mapActions(["initialize", "getEntries", "setBreadcrumbs", "setTitle"]),

    update() {
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
    }
  }
};
</script>
