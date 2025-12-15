<template>
  <div class="entry">
    <blog-entry
      v-if="initialized && ready && loaded && entry"
      v-bind="entry"
      :fullMode="true"
      :links="entry.links"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import BlogEntry from "@/components/BlogEntry";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "entry",

  components: { BlogEntry },

  props: {
    links: Array
  },

  data() {
    const entityType = this.$route.path.match(/\/draft\//) ? "draft" : "entry";
    return {
      context: { id: "view", props: ["entry", this.$route.params.id] },
      firstUpdate: true,
      id: this.$route.params.id,
      entityType,
      loaded: false
    };
  },

  computed: {
    ...mapState(["initialized"]),

    ...mapGetters(["contextIsReady"]),

    ready() {
      return this.contextIsReady(this.context);
    },

    entry() {
      return this.$store.getters[
        this.entityType === "entry" ? "entryById" : "draftById"
      ](this.id);
    }
  },

  created() {
    this.addContext(this.context);
  },

  async mounted() {
    await this.update();
  },

  async updated() {
    await this.update();
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
      if (this.ready && !this.loaded) {
        this.loaded = true;
        await this[this.entityType === "entry" ? "getEntry" : "getDraft"]({
          links: this.links,
          id: this.id
        });
        this.setBreadcrumbs([
          {
            href: `/${this.entityType}/${this.entry.id}`,
            label: this.entry.title
          }
        ]);
        this.setTitle(this.entry.title);
      }
    }
  }
};
</script>
