<template>
  <div class="blog-admin">
    <button
      class="blog-admin__entry-button"
      @click="showEntryForm"
      v-if="!entryFormIsOpen"
    >
      +
    </button>
    <button class="blog-admin__entry-button" @click="hideEntryForm" v-else>
      -
    </button>
    <blog-entry-form v-if="entryFormIsOpen" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BlogEntryForm from "@/components/BlogEntryForm.vue";

export default {
  name: "blog-admin",

  components: { BlogEntryForm },

  computed: {
    ...mapGetters(["entryFormIsOpen"])
  },

  methods: {
    ...mapActions(["showAdminPane", "showEntryForm", "hideEntryForm"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.blog-admin {
  position: relative;
  min-height: 3rem;
  padding: $space-xsmall $space-xlarge;
  background-color: #333;
  transition: all 0.3s;

  &--open {
    height: auto;
  }

  &__entry-button {
    position: absolute;
    top: $space;
    right: $space;
    border-radius: 50%;
    height: $space-xlarge;
    width: $space-xlarge;
    outline: none;
    font-family: impact;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
    line-height: 24px;
    background-color: $color-button-bg;
    border: 2px $color-button-border solid;
    padding: 0;
    &:hover {
      background-color: $color-button-over;
    }
  }
}
</style>
