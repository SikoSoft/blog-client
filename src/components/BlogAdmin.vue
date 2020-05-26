<template>
  <div class="blog-admin">
    <blog-button
      class="blog-admin__entry-button"
      :action="showEntryForm"
      v-if="!entryFormIsOpen"
      text="+"
    />
    <blog-button class="blog-admin__entry-button" :action="hideEntryForm" v-else text="-" />
    <blog-entry-form v-if="entryFormIsOpen" :initialEntry="{ api: { save: api.newEntry } }" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import BlogButton from "@/components/BlogButton.vue";
import BlogEntryForm from "@/components/BlogEntryForm.vue";

export default {
  name: "blog-admin",

  components: { BlogEntryForm, BlogButton },

  computed: {
    ...mapGetters(["entryFormIsOpen", "api"])
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
  background-color: $color-bg-secondary;
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
