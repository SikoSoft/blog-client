<template>
  <div class="blocks">
    <admin-blocks
      v-if="ready && blocks.length"
      :blocks="blocks"
      :links="blocksLinks"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import AdminBlocks from "@/components/Admin/Blocks/Blocks";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blocks",

  components: { AdminBlocks },

  props: {
    links: Array
  },

  data() {
    return {
      firstUpdate: true,
      context: { id: "view", props: ["blocks"] },
      blocksLinks: []
    };
  },

  created() {
    this.addContext(this.context);
  },

  async mounted() {
    this.update();
  },

  async updated() {
    console.log("blocks updated");
    this.update();
  },

  beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["initialized", "user", "blocks"]),

    ...mapGetters(["contextIsReady"]),

    ready() {
      return this.contextIsReady(this.context);
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "addContext",
      "removeContext",
      "apiRequest"
    ]),

    ...mapMutations(["setBlocks"]),

    async update() {
      await this.initialize();
      if (this.ready && this.firstUpdate) {
        this.firstUpdate = false;
        const { blocks, links } = await this.apiRequest(
          this.link("GET", "blocks")
        );
        this.setBlocks({ blocks });
        this.blocksLinks = links;
        this.setBreadcrumbs([
          { href: "/admin", label: this.$strings.admin },
          { href: "/admin/blocks", label: this.$strings.blocks }
        ]);
        this.setTitle(this.$strings.blocks);
      }
    }
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_blocks")) {
        this.$router.push({ path: "/access_denied" });
      }
    }
  }
};
</script>
