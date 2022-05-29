<template>
  <div class="blog-admin" :class="{ 'blog-admin--open': entryFormIsOpen }">
    <div class="blog-admin__inner">
      <div class="blog-admin__bar">
        <template v-if="link('POST', 'entry')">
          <router-link class="blog-admin__link" to="/admin">{{
            $strings.admin
          }}</router-link>
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
        </template>
      </div>
      <div class="blog-admin__tool">
        <blog-entry-form
          v-if="entryFormIsOpen"
          :initial="{
            links
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BlogButton from "@/components/BlogButton";
import BlogEntryForm from "@/components/BlogEntryForm";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "blog-admin-pane",

  props: {
    links: Array
  },

  components: { BlogEntryForm, BlogButton },

  computed: {
    ...mapState(["entryFormIsOpen", "user"])
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["showAdminPane", "showEntryForm", "hideEntryForm"])
  }
};
</script>

<style lang="scss" scoped>
@import "@theme/variables";
@import "@theme/mixins";

.blog-admin {
  position: sticky;
  top: 0;
  z-index: 100;
  color: $color-secondary-text;
  background-color: $color-secondary-bg;
  transition: all 0.3s;
  border-bottom: 1px $color-secondary-border solid;

  &--open {
    height: auto;
    box-shadow: 0 0 500px $color-box-shadow;
  }

  &__bar {
    @include container-width;
    height: $admin-pane-height;
    position: relative;
    display: flex;
    justify-content: space-between;

    & > * {
      align-self: center;
    }
  }

  &__tool {
    @include container-width;
  }

  &__link {
    color: $color-secondary-link;
    font-weight: bold;
  }

  &__entry-button {
    border-radius: 50%;
    height: $space;
    width: $space;
    outline: none;
    font-family: impact;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    line-height: 16px;
    background-color: $color-button-bg;
    border: 1px $color-button-border solid;
    padding: 0;
    transition: all 0.3s;
    &:hover {
      background-color: $color-button-over;
      transform: scale(1.5);
    }
  }
}
</style>
