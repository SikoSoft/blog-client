<template>
  <div class="entry">
    <blog-entry v-if="loaded && entry" v-bind="entry" :fullMode="true" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BlogEntry from "@/components/BlogEntry.vue";

export default {
  name: "entry",

  components: { BlogEntry },

  data() {
    return {
      id: this.$route.params.id,
      routeType: this.$route.path.match(/\/draft\//) ? "draft" : "entry",
      loaded: false
    };
  },

  computed: {
    ...mapState(["initialized"]),

    entry: function() {
      return this.$store.getters[
        this.routeType === "entry" ? "entryById" : "draftById"
      ](this.id);
    }
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
    ...mapActions([
      "initialize",
      "getEntry",
      "getDraft",
      "setBreadcrumbs",
      "setTitle"
    ]),

    update() {
      this.initialize().then(() => {
        this[this.routeType === "entry" ? "getEntry" : "getDraft"]({
          id: this.id
        }).then(() => {
          this.loaded = true;
          this.setBreadcrumbs([
            {
              href: `/${this.routeType}/${this.entry.id}`,
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
