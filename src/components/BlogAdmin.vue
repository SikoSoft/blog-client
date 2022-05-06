<template>
  <div class="blog-admin" :class="{ 'blog-admin--open': entryFormIsOpen }">
    <div class="blog-admin__inner">
      <template v-if="user.rights.includes('create_entry')">
        <router-link to="/admin">{{ $strings.admin }}</router-link>
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
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: $color-bg-secondary;
  transition: all 0.3s;
  border-bottom: 1px $color-border-secondary solid;

  &--open {
    height: auto;
    box-shadow: 0 0 500px rgba(0, 0, 0, 1);
  }

  &__inner {
    @include container-width;
    position: relative;
    padding: $space-xsmall 0;
    display: flex;
    justify-content: space-between;

    & > * {
      align-self: center;
    }
  }

  &__entry-button {
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
