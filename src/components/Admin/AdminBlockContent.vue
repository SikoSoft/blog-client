<template>
  <div class="admin-block-content">
    <textarea v-model="content"></textarea>
    <div class="admin-block-content__buttons">
      <blog-button
        create
        v-if="addLink"
        :action="addContent"
        :text="$strings.add"
      />
      <blog-button
        create
        v-if="updateLink"
        :action="updateContent"
        :text="$strings.update"
      />
      <blog-button
        destroy
        v-if="deleteLink"
        :action="deleteContent"
        :text="$strings.delete"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import BlogButton from "@/components/BlogButton";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-block-content",

  components: { BlogButton },

  props: {
    links: Array,
    initial: Object
  },

  data() {
    return {
      content: this?.initial?.content || ""
    };
  },

  computed: {
    addLink() {
      return this.link("POST", "blockContent");
    },

    updateLink() {
      return this.link("PUT", "blockContent");
    },

    deleteLink() {
      return this.link("DELETE", "blockContent");
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["apiRequest"]),

    ...mapMutations(["setBlockContent"]),

    async addContent() {
      await this.apiRequest(this.addLink);
    },

    async updateContent() {
      await this.apiRequest(this.updateLink);
    },

    async deleteContent() {
      await this.apiRequest(this.deleteLink);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@theme/variables";
@import "@theme/mixins";

.admin-block-content {
  @include admin-list-item;

  &__buttons {
    margin-top: $space;
  }
}
</style>
