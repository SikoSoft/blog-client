<template>
  <div class="entry">
    <blog-entry
      v-if="initialized && loaded && entry"
      v-bind="entry"
      :fullMode="true"
      :links="entry.links"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import BlogEntry from "@/components/BlogEntry.vue";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "entry",

  components: { BlogEntry },

  props: {
    links: Array
  },

  data() {
    return {
      firstUpdate: true,
      id: this.$route.params.id,
      routeType: this.$route.path.match(/\/draft\//) ? "draft" : "entry",
      loaded: false
    };
  },

  computed: {
    ...mapState(["initialized"]),

    entry() {
      return this.$store.getters[
        this.routeType === "entry" ? "entryById" : "draftById"
      ](this.id);
    }
  },

  mounted() {
    this.addContext({ id: "view", props: ["entry", this.id] });
    this.update();
  },

  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id;
    this.update();
    next();
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      "getEntry",
      "getDraft",
      "setBreadcrumbs",
      "setTitle",
      "apiRequest",
      "addContext"
    ]),

    ...mapMutations(["setEntryById"]),

    async update() {
      await this.initialize();
      await this[this.routeType === "entry" ? "getEntry" : "getDraft"]({
        links: this.links,
        id: this.id
      });
      this.loaded = true;
      this.setBreadcrumbs([
        {
          href: `/${this.routeType}/${this.entry.id}`,
          label: this.entry.title
        }
      ]);
      this.setTitle(this.entry.title);
    }
  }
};
</script>
