<template>
  <div class="blog-entry-finder">
    <div class="blog-entry-finder__input">
      <input type="text" v-model="title" />
    </div>
    <ul class="blog-entry-finder__list">
      <li
        class="blog-entry-finder__list-item"
        v-for="entry in entriesFound"
        :key="entry.id"
        @click="$emit('entryClicked', entry)"
      >{{ entry.title }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "blog-entry-finder",

  data() {
    return {
      title: ""
    };
  },

  computed: {
    ...mapGetters(["entriesFound"])
  },

  mounted() {
    console.log("mounted");
  },

  methods: {
    ...mapActions(["findEntries"])
  },

  watch: {
    title(title) {
      if (title.length) {
        this.findEntries({ title });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.blog-entry-finder {
  width: 25vw;

  &__input {
    input {
      width: 100%;
    }
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;

    &-item {
      margin: $space-small 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
    }
  }
}
</style>
