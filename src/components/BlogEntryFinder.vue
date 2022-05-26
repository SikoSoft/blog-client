<template>
  <div class="blog-entry-finder">
    <div class="blog-entry-finder__input">
      <input
        type="text"
        :placeholder="$strings.title"
        v-model="title"
        ref="title"
        @blur="blurInput"
      />
    </div>
    <ul class="blog-entry-finder__list">
      <li
        class="blog-entry-finder__list-item"
        :class="{
          'blog-entry-finder__list-item--selected': entry.id === selectedItem
        }"
        v-for="entry in entriesFound"
        :key="entry.id"
        @click="$emit('entryClicked', entry)"
        @mouseover="selectedItem = entry.id"
      >
        {{ entry.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "blog-entry-finder",

  data() {
    return {
      title: "",
      selectedItem: ""
    };
  },

  computed: {
    ...mapState(["entriesFound"])
  },

  mounted() {
    this.$refs.title.focus();
  },

  methods: {
    ...mapActions(["findEntries"]),

    blurInput() {
      setTimeout(() => {
        this.$emit("inputBlurred");
      }, 200);
    }
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
@import "@theme/mixins";
@import "@theme/variables";

.blog-entry-finder {
  width: 25vw;

  &__input {
    input {
      width: 100%;
    }
  }

  &__list {
    @include dropdown-list;

    &-item {
      @include dropdown-item;
    }
  }
}
</style>
