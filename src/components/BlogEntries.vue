<template>
  <div class="blog-entries">
    <div class="blog-entries__list" v-if="initialized">
      <blog-entry
        v-for="entry in entries"
        :key="entry.id"
        v-bind="entry"
        :fullMode="settings.teaser_mode === 0"
        :ref="`entry${entry.id}`"
        @loaded="childLoaded"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import BlogEntry from "@/components/BlogEntry.vue";

export default {
  name: "blog-entries",

  props: ["entries"],

  components: { BlogEntry },

  data() {
    return {
      entriesLoaded: 0
    };
  },

  computed: {
    ...mapGetters(["initialized", "settings"])
  },

  methods: {
    ...mapMutations(["setWindowYLoadNew"]),

    childLoaded() {
      this.entriesLoaded++;
    }
  },

  watch: {
    entriesLoaded() {
      if (this.entries.length && this.entries.length === this.entriesLoaded) {
        const lastEntry = this.entries[this.entries.length - 1];
        const lastId = lastEntry.id;
        const trigger = this.$refs[`entry${lastId}`][0].$refs.container;
        const windowY =
          trigger.getBoundingClientRect().top +
          window.pageYOffset -
          window.innerHeight;
        this.setWindowYLoadNew({
          windowY
        });
      }
    }
  }
};
</script>

<style lang="scss">
.blog-entries {
  //padding: 10px;
}
</style>
