<template>
  <select v-if="ready" @change="change">
    <option value="0">{{ $strings.selectABlock }}</option>
    <option
      v-for="block of blocks"
      :key="block.id"
      :value="block.id"
      :selected="block.id === value"
      >{{ block.name }} ({{ block.id }})</option
    >
  </select>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "blog-block-selector",

  props: {
    value: Number
  },

  data() {
    return {
      firstUpdate: true,
      context: { id: "needs", props: ["blocks"] }
    };
  },

  async created() {
    this.addContext(this.context);
  },

  async mounted() {
    this.update();
  },

  async updated() {
    this.update();
  },

  async beforeDestroy() {
    this.removeContext(this.context);
  },

  computed: {
    ...mapState(["blocks"]),

    ...mapGetters(["contextIsReady"]),

    ready() {
      return this.contextIsReady(this.context);
    }
  },

  methods: {
    ...mapActions(["getBlocks", "addContext", "removeContext"]),

    async update() {
      if (this.ready && this.firstUpdate) {
        await this.getBlocks();
      }
    },

    change(e) {
      this.$emit("input", parseInt(e.target.value));
    }
  }
};
</script>
