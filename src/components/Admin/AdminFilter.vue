<template>
  <div class="admin-filter" :class="{ 'admin-filter--new': !id }">
    <div class="admin-filter__fields">
      <div class="admin-filter__field">
        <input
          class="admin-filter__input"
          :class="{
            'admin-filter__input--unsaved': initial && initial.label !== label
          }"
          :placeholder="$strings.title"
          type="text"
          v-model="label"
          @keydown="handleLabelUpdate"
        />
      </div>
      <div class="admin-filter__field" :class="{ 'admin-filter__field--gone': !showId }">
        <input
          class="admin-filter__input"
          :class="{
            'admin-filter__input--unsaved': initial && initial.id !== id
          }"
          :placeholder="$strings.id"
          type="text"
          v-model="newId"
          @keydown="handleUpdate"
        />
      </div>
      <div class="admin-filter__field">
        <blog-button
          class="admin-filter__image-upload"
          :text="$strings.upload"
          :action="selectImage"
        />
        <input
          ref="image"
          class="admin-filter__input admin-filter__input-image"
          :placeholder="$strings.image"
          type="text"
          :value="image"
          @keydown="handleUpdate"
          @change="handleUpdate"
        />
        <img class="admin-filter__image" :src="image" v-if="image" />
      </div>
      <div class="admin-filter__field admin-filter__delete" v-if="id">
        <blog-button destroy :text="$strings.delete" :action="showDeleteDialog" />
      </div>
    </div>
    <blog-confirmation-dialog
      :title="$strings.deleteFilter"
      :message="$strings.confirmDeleteFilter"
      :isOpen="deleteDialogIsOpen"
    >
      <blog-button
        destroy
        :text="$strings.yes"
        :action="
          () => {
            deleteFilter({ id });
          }
        "
      />
      <blog-button :text="$strings.no" :action="hideDeleteDialog" />
    </blog-confirmation-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import BlogButton from "@/components/BlogButton.vue";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog.vue";
import { sanitizeTitle } from "@/util/sanitizeTitle.js";
import imageHandler from "@/util/imageHandler";

export default {
  name: "admin-filter",

  components: { BlogButton, BlogConfirmationDialog },

  props: ["initial", "showId"],

  data() {
    return {
      id: this.initial ? this.initial.id : "",
      newId: this.initial ? this.initial.id : "",
      label: this.initial ? this.initial.label : "",
      image: this.initial ? this.initial.image : "",
      updateTimeout: 0,
      deleteDialogIsOpen: false
    };
  },

  mounted() {
    this.imageHandler = new imageHandler({
      type: "filter",
      setProgress: this.setProgress,
      setImage: this.setImage,
      uploadImage: this.api.uploadImage,
      headers: this.headers
    });
  },

  computed: {
    ...mapGetters(["headers", "api"])
  },

  methods: {
    ...mapActions([
      "createFilter",
      "updateFilter",
      "deleteFilter",
      "setProgress"
    ]),

    selectImage() {
      this.imageHandler.selectLocalImage();
    },

    setImage(url) {
      console.log(this);
      this.image = url;
      this.handleUpdate();
    },

    handleLabelUpdate() {
      if (this.showId) {
        this.newId = sanitizeTitle(this.label);
      }
      this.handleUpdate();
    },

    handleUpdate() {
      if (!this.newId) {
        return;
      }
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
      }
      this.updateTimeout = setTimeout(() => {
        const filter = {
          id: this.id,
          newId: this.newId,
          label: this.label,
          image: this.image
        };
        if (this.id) {
          this.updateFilter(filter);
        } else {
          this.createFilter(filter).then(() => {
            this.newId = "";
            this.label = "";
            this.image = "";
          });
        }
      }, 500);
    },

    showDeleteDialog() {
      this.deleteDialogIsOpen = true;
    },

    hideDeleteDialog() {
      this.deleteDialogIsOpen = false;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.admin-filter {
  background-color: $color-bg-secondary;
  border: 1px $color-border-secondary solid;
  border-radius: 1rem;
  margin: 0.5rem;
  padding: 0.5rem;

  .admin-filter__fields {
    margin: $space-small 0;
    display: flex;
  }

  &__field {
    padding: $space-xxxsmall;
    transition: all 0.5s;
    opacity: 1;
    position: relative;

    &:first-child,
    &:nth-child(2) {
      flex: 1;
    }

    &:nth-child(3) {
      flex: 2;
    }
  }

  .admin-filter__field--gone {
    flex: 0;
    padding: $space-xxxsmall 0;
    overflow: hidden;
    width: 0;
    opacity: 0;
  }

  &__input {
    width: 100%;
    box-sizing: border-box;
    border: 2px transparent solid;

    &--unsaved {
      border: 2px $color-action-neutral-bg solid;
    }
  }

  &__delete {
    flex: 0;
    opacity: 0;
    overflow: hidden;
    vertical-align: top;
    padding: $space-xxxsmall 0;

    button {
      vertical-align: top;
      float: right;
    }
  }

  &:hover:not(.admin-filter--new) {
    .admin-filter__field:nth-child(3) {
      flex: 1.75;
    }
    .admin-filter__delete {
      flex: 0.25;
      opacity: 1;
    }
  }

  .admin-filter__image {
    max-width: 320px;
  }

  .admin-filter__input-image {
    padding-left: 4rem;
  }

  .admin-filter__image-upload {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    padding: 0.25rem;
    border-color: $color-border-primary;
    transition: all 0.3s;

    &:hover {
      background-color: $color-button-over;
    }
  }
}
</style>
