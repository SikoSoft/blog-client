<template>
  <div class="admin-filter-rule">
    <select v-model="type">
      <option :value="type" v-for="type in types" :key="type">{{ type }}</option>
    </select>
    <select v-model="operator">
      <option :value="operator" v-for="operator in operators" :key="operator">{{ operator }}</option>
    </select>
    <input type="text" v-model="value" />
    <span class="admin-filter-rule__create-button" v-if="!id">
      <blog-button
        create
        :text="$strings.add"
        :action="
          () => {
            addFilterRule({ filterId, type, operator, value }).then(() => {
              reset();
            });
          }
        "
      />
    </span>
    <span class="admin-filter-rule__edit-buttons" v-else>
      <blog-button
        create
        :text="$strings.update"
        :action="
          () => {
            updateFilterRule({ filterId, id, type, operator, value });
          }
        "
      />
      <blog-button destroy :text="$strings.delete" :action="showDeleteDialog" />
    </span>
    <blog-confirmation-dialog
      :title="$strings.deleteFilterRule"
      :message="$strings.confirmDeleteFilterRule"
      :isOpen="deleteDialogIsOpen"
    >
      <blog-button
        destroy
        :text="$strings.yes"
        :action="
          () => {
            deleteFilterRule({ filterId, id });
          }
        "
      />
      <blog-button :text="$strings.no" :action="hideDeleteDialog" />
    </blog-confirmation-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import BlogConfirmationDialog from "@/components/BlogConfirmationDialog.vue";
import BlogButton from "@/components/BlogButton.vue";

export default {
  name: "admin-filter-rule",

  props: ["initial", "filterId"],

  components: { BlogButton, BlogConfirmationDialog },

  data() {
    const dataObj = { types: ["tag"], operators: ["=", "!="] };
    return {
      ...dataObj,
      id: this.initial ? this.initial.id : "",
      type: this.initial ? this.initial.type : dataObj.types[0],
      operator: this.initial ? this.initial.operator : dataObj.operators[0],
      value: this.initial ? this.initial.value : "",
      deleteDialogIsOpen: false
    };
  },

  methods: {
    ...mapActions(["addFilterRule", "deleteFilterRule", "updateFilterRule"]),

    reset() {
      this.type = this.initial ? this.initial.type : this.types[0];
      this.operator = this.initial ? this.initial.operator : this.operators[0];
      this.value = this.initial ? this.initial.value : "";
    },

    deleteRule() {
      this.$emit("deleteRule", { id: this.id });
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

<style lang="scss" scoped>
.admin-filter-rule {
  display: flex;

  > {
    vertical-align: middle;
  }

  *:nth-child(1),
  *:nth-child(2),
  *:nth-child(3) {
    flex: 3;
  }

  &__create-button,
  &__edit-buttons {
    flex: 2;

    button {
      height: 100%;
    }
  }

  &__create-button button {
    width: 100%;
  }

  &__edit-buttons button {
    width: 50%;
  }
}
</style>
