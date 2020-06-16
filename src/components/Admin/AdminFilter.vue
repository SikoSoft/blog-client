<template>
  <li class="admin-filter">
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
        <input class="admin-filter__input" :placeholder="$strings.image" type="text" :value="image" />
      </div>
      <div class="admin-filter__field admin-filter__delete" v-if="id">
        <blog-button
          destroy
          :text="$strings.delete"
          :action="
            () => {
              deleteFilter({ id });
            }
          "
        />
      </div>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";

import BlogButton from "@/components/BlogButton.vue";
import { sanitizeTitle } from "@/util/sanitizeTitle.js";

export default {
  name: "admin-filter",

  components: { BlogButton },

  props: ["initial", "showId"],

  data() {
    return {
      id: this.initial ? this.initial.id : "",
      newId: this.initial ? this.initial.id : "",
      label: this.initial ? this.initial.label : "",
      image: this.initial ? this.initial.image : "",
      updateTimeout: 0
    };
  },

  methods: {
    ...mapActions(["createFilter", "updateFilter", "deleteFilter"]),

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
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.admin-filter {
  .admin-filter__fields {
    margin: $space-small 0;
    display: flex;
  }

  &__field {
    padding: $space-xxxsmall;
    transition: all 0.5s;
    opacity: 1;

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
    transition: all 0.3s;
    opacity: 0;
    overflow: hidden;
    vertical-align: top;
    padding: $space-xxxsmall 0;

    button {
      vertical-align: top;
      float: right;
    }
  }
  &:hover {
    .admin-filter__delete {
      flex: 0.25;
      opacity: 1;
    }
  }
}
</style>
