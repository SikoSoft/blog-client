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
import BlogEntry from "@/components/BlogEntry";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "entry",

  components: { BlogEntry },

  props: {
    links: Array
  },

  data() {
    return {
      context: { id: "view", props: ["entry", this.$route.params.id] },
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
    this.addContext(this.context);
    this.update();
  },

  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id;
    this.update();
    next();
  },

  beforeDestroy() {
    this.removeContext(this.context);
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
      "addContext",
      "removeContext"
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
