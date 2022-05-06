<template>
  <div class="blog-admin">
    <div class="blog-admin__inner">
      <template v-if="user.rights.includes('create_entry')">
        <blog-button
          class="blog-admin__entry-button"
          :action="showEntryForm"
          v-if="!entryFormIsOpen"
          text="+"
        />
        <blog-button
          class="blog-admin__entry-button"
          :action="hideEntryForm"
          v-else
          text="-"
        />
        <blog-entry-form
          v-if="entryFormIsOpen"
          :initialEntry="{ links: { save: links.newEntry } }"
        />
      </template>
    </div>
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
    ...mapGetters(["entryFormIsOpen", "links", "user"])
  },

  methods: {
    ...mapActions(["showAdminPane", "showEntryForm", "hideEntryForm"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.blog-admin {
  position: relative;
  background-color: $color-bg-secondary;
  transition: all 0.3s;

  &--open {
    height: auto;
  }

  &__inner {
    @include container-width;
    position: relative;
    padding: $space-xsmall $space-xlarge;
    min-height: 3rem;
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
