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
          @keyup="handleLabelUpdate"
        />
      </div>
      <div
        class="admin-filter__field"
        :class="{ 'admin-filter__field--gone': !showId }"
      >
        <input
          class="admin-filter__input"
          :class="{
            'admin-filter__input--unsaved': initial && initial.id !== id
          }"
          :placeholder="$strings.id"
          type="text"
          v-model="newId"
        />
      </div>
      <div class="admin-filter__field">
        <blog-image-input type="filter" v-model="image" />
      </div>
      <div class="admin-filter__field">
        <blog-button
          v-if="addLink"
          create
          :text="$strings.add"
          :action="addFilter"
        />
        <blog-button
          v-if="updateLink"
          create
          :text="$strings.update"
          :action="updateFilter"
        />
        <blog-button
          v-if="deleteLink"
          destroy
          :text="$strings.delete"
          :action="showDeleteDialog"
        />
      </div>
    </div>
    <fieldset class="admin-filter__rules" v-if="id">
      <legend>{{ $strings.rules }}</legend>
      <admin-filter-rules :rules="rules" :filterId="id" :links="newRuleLinks" />
    </fieldset>
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
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import BlogButton from "@/components/BlogButton";
import BlogImageInput from "@/components/BlogImageInput";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";
import AdminFilterRules from "@/components/Admin/Filters/FilterRules";
import { sanitizeTitle } from "@/util/sanitizeTitle.js";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-filter",

  components: {
    BlogButton,
    BlogImageInput,
    BlogConfirmationDialog,
    AdminFilterRules
  },

  props: {
    links: Array,
    initial: { type: Object },
    rules: { type: Array },
    showId: { type: Number }
  },

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

  mounted() {},

  computed: {
    ...mapState(["filters"]),

    ...mapGetters(["headers"]),

    addLink() {
      return this.link("POST", "filter");
    },

    updateLink() {
      return this.link("PUT", "filter");
    },

    deleteLink() {
      return this.link("DELETE", "filter");
    },

    newRuleLinks() {
      return this.link("POST", "filterRule")
        ? [this.link("POST", "filterRule")]
        : [];
    },

    payload() {
      return {
        id: this.id,
        newId: this.newId,
        label: this.label,
        image: this.image
      };
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["apiRequest"]),

    ...mapMutations(["setFilters"]),

    handleLabelUpdate() {
      if (this.showId) {
        this.newId = sanitizeTitle(this.label);
      }
    },

    reset() {
      this.id = "";
      this.newId = "";
      this.label = "";
      this.image = "";
    },

    async addFilter() {
      if (!this.id) {
        this.id = sanitizeTitle(this.label);
      }
      const { filter } = await this.apiRequest({
        ...this.addLink,
        body: this.payload
      });
      this.setFilters({ filters: [...this.filters, filter] });
      this.reset();
    },

    async updateFilter() {
      const { filter } = await this.apiRequest({
        ...this.updateLink,
        body: this.payload
      });
      this.setFilters({
        filters: this.filters.map(stateFilter =>
          stateFilter.id === this.payload.id ? filter : stateFilter
        )
      });
    },

    async deleteFilter() {
      await this.apiRequest(this.deleteLink);
      this.setFilters({
        filters: [...this.filters.filter(filter => filter.id !== this.id)]
      });
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
@import "@theme/variables";

.admin-filter {
  background-color: $color-secondary-bg;
  border: 1px $color-secondary-border solid;
  border-radius: 1rem;
  margin: 0.5rem;
  padding: 0.5rem;

  .admin-filter__fields {
    margin: $space-small 0;
    //display: flex;
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
    overflow: hidden;
    vertical-align: top;
    padding: $space-xxxsmall 0;

    button {
      vertical-align: top;
      float: right;
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
    border-color: $color-primary-border;
    transition: all 0.3s;

    &:hover {
      background-color: $color-button-over;
    }
  }
}
</style>
