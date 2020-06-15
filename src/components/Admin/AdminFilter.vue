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
          @keydown="handleUpdate"
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
    </div>
    <div class="admin-filter__delete" v-if="id">
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
  </li>
</template>

<script>
import { mapActions } from "vuex";

import BlogButton from "@/components/BlogButton.vue";

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
    &:last-child {
      flex: 2;
    }
  }
  .admin-filter__field--gone {
    flex: 0 !important;
    padding: $space-xxxsmall 0 !important;
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
    height: 0;
    transition: all 0.3s;
    opacity: 0;
    overflow: hidden;
  }
  &:hover {
    .admin-filter__delete {
      height: 3rem;
      line-height: 3rem;
      opacity: 1;
    }
  }
}
</style>
