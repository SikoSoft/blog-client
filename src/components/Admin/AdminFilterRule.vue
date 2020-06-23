<template>
  <div class="admin-filter-rule">
    <select v-model="type">
      <option :value="type" v-for="type in types" :key="type">{{ type }}</option>
    </select>
    <select v-model="operator">
      <option :value="operator" v-for="operator in operators" :key="operator">{{ operator }}</option>
    </select>
    <input type="text" v-model="value" />
    <blog-button
      v-if="!id"
      create
      :text="$strings.add"
      :action="
        () => {
          addFilterRule({ filterId, type, operator, value });
        }
      "
    />
    <blog-button v-else destroy :text="$strings.delete" :action="showDeleteDialog" />
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
    ...mapActions(["addFilterRule", "deleteFilterRule"]),

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
}
</style>
