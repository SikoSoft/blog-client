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
            v-if="addLink"
            create
            :text="$strings.add"
            :action="addSize"
          />
          <blog-button
            v-if="updateLink"
            create
            :text="$strings.update"
            :action="updateSize"
          />
          <blog-button
            v-if="deleteLink"
            destroy
            :text="$strings.delete"
            :action="showConfirmationDialog"
          />
        </td>
      </tr>
    </table>

    <blog-confirmation-dialog
      v-if="deleteLink"
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
import { mapActions, mapMutations, mapState } from "vuex";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";
import BlogButton from "@/components/BlogButton";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-image-size",

  components: { BlogButton, BlogConfirmationDialog },

  props: {
    initial: Object,
    links: Array
  },

  data() {
    return {
      width: this.initial.width ? this.initial.width : 0,
      height: this.initial.width ? this.initial.height : 0,
      confirmationDialogOpen: false
    };
  },

  computed: {
    ...mapState(["imageSizes"]),

    addLink() {
      return this.link("POST", "imageSize");
    },

    updateLink() {
      return this.link("PUT", "imageSize");
    },

    deleteLink() {
      return this.link("DELETE", "imageSize");
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["apiRequest", "addToast"]),

    ...mapMutations(["setImageSizes"]),

    async addSize() {
      try {
        const { imageSize } = await this.apiRequest({
          ...this.addLink,
          body: { width: this.width, height: this.height }
        });
        this.setImageSizes({ imageSizes: [...this.imageSizes, imageSize] });
        this.addToast(this.$strings.imageSizeAdded);
        this.width = 0;
        this.height = 0;
      } catch (error) {
        console.error(error);
      }
    },

    async updateSize() {
      try {
        const { imageSize } = await this.apiRequest({
          ...this.updateLink,
          body: { width: this.width, height: this.height }
        });
        this.setImageSizes({
          imageSizes: [
            ...this.imageSizes.map(stateImageSize =>
              stateImageSize.width === this.initial.width
                ? imageSize
                : stateImageSize
            )
          ]
        });
        this.addToast(this.$strings.imageSizeUpdated);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteSize() {
      try {
        await this.apiRequest(this.deleteLink);
        this.setImageSizes({
          imageSizes: [
            ...this.imageSizes.filter(
              imageSize => imageSize.width !== this.width
            )
          ]
        });
        this.addToast(this.$strings.imageSizeDeleted);
      } catch (error) {
        console.error(error);
      }
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
