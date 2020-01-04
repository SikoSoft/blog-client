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
  min-height: 3rem;
  padding: $space-xsmall $space-xlarge;
  background-color: #333;
  transition: all 0.3s;

  &--open {
    height: auto;
  }
}
</style>
