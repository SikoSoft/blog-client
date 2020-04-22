<template>
  <div class="blog-entries">
    <div class="blog-entries__list" v-if="initialized">
      <blog-entry
        v-for="entry in entries"
        :key="entry.id"
        v-bind="entry"
        :fullMode="settings.teaser_mode === 0"
        :ref="`entry${entry.id}`"
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

  computed: {
    ...mapGetters(["initialized", "settings"])
  },

  methods: {
    ...mapMutations(["setWindowYLoadNew"])
  },

  updated() {
    if (this.entries.length) {
      const lastId = this.entries[this.entries.length - 1].id;
      const trigger = this.$refs[`entry${lastId}`][0].$refs.container;
      this.setWindowYLoadNew({
        windowY: trigger.getBoundingClientRect().top - window.innerHeight
      });
    }
  }
};
</script>

<style lang="scss">
.blog-entries {
  //padding: 10px;
}
</style>
