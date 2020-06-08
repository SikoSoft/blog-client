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
        @edited="childEdited"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import BlogEntry from "@/components/BlogEntry.vue";

export default {
  name: "blog-entries",

  props: ["type", "entries"],

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
    ...mapMutations(["setWindowYLoadNew", "setEntryTop"]),

    childLoaded() {
      this.entriesLoaded++;
    },

    childEdited(id) {
      setTimeout(() => {
        window.scroll({
          top: this.entryTop(id),
          left: 0,
          behavior: "smooth"
        });
      }, 0);
    },

    entryTop(id) {
      return (
        this.$refs[`entry${id}`][0].$refs.container.getBoundingClientRect()
          .top + document.documentElement.scrollTop
      );
    }
  },

  watch: {
    entriesLoaded() {
      if (this.entries.length && this.entries.length === this.entriesLoaded) {
        const lastId = this.entries[this.entries.length - 1].id;
        const windowY =
          this.$refs[
            `entry${lastId}`
          ][0].$refs.container.getBoundingClientRect().top +
          window.pageYOffset -
          window.innerHeight;
        this.setWindowYLoadNew({
          type: this.type,
          windowY
        });
        this.entries.forEach(entry => {
          this.setEntryTop({
            type: this.type,
            id: entry.id,
            top: this.entryTop(entry.id)
          });
        });
      }
    }
  }
};
</script>
