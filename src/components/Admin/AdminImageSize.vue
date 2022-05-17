<template>
  <div class="admin-image-size">
    <table>
      <tr>
        <td>
          <input type="text" v-model="width" :placeholder="$strings.width" />
        </td>
        <td>
          <input type="text" v-model="height" :placeholder="$strings.height" />
        </td>
        <td>
          <blog-button
            v-if="links.add"
            create
            :text="$strings.add"
            :action="addSize"
          />
          <blog-button
            v-if="links.update"
            create
            :text="$strings.update"
            :action="updateSize"
          />
          <blog-button
            v-if="links.delete"
            destroy
            :text="$strings.delete"
            :action="showConfirmationDialog"
          />
        </td>
      </tr>
    </table>

    <blog-confirmation-dialog
      v-if="links.delete"
      :isOpen="confirmationDialogOpen"
      :title="$strings.deleteImageSize"
      :message="$strings.confirmDeleteImageSize"
    >
      <blog-button destroy :text="$strings.yes" :action="deleteSize" />
      <blog-button :text="$strings.no" :action="hideConfirmationDialog" />
    </blog-confirmation-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";
import BlogButton from "@/components/BlogButton";

export default {
  name: "admin-image-size",

  components: { BlogButton, BlogConfirmationDialog },

  props: {
    initial: Object,
    links: Object
  },

  data() {
    return {
      width: this.initial.width ? this.initial.width : 0,
      height: this.initial.width ? this.initial.height : 0,
      confirmationDialogOpen: false
    };
  },

  methods: {
    ...mapActions(["apiRequest", "addToast"]),

    ...mapMutations(["setImageSizes"]),

    async addSize() {
      await this.apiRequest({
        ...this.links.add,
        body: JSON.stringify({ width: this.width, height: this.height })
      });
      this.addToast(this.$strings.imageSizeAdded);
    },

    async updateSize() {
      await this.apiRequest({
        ...this.links.update,
        body: JSON.stringify({ width: this.width, height: this.height })
      });
      this.addToast(this.$strings.imageSizeUpdated);
    },

    async deleteSize() {
      await this.apiRequest(this.links.delete);
      this.addToast(this.$strings.imageSizeDeleted);
    },

    hideConfirmationDialog() {
      this.confirmationDialogOpen = false;
    },

    showConfirmationDialog() {
      this.confirmationDialogOpen = true;
    }
  }
};
</script>
