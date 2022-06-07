<template>
  <div class="admin-filter-rule">
    <select v-model="type">
      <option :value="type" v-for="type in types" :key="type">{{
        type
      }}</option>
    </select>
    <select v-model="operator">
      <option :value="operator" v-for="operator in operators" :key="operator">{{
        operator
      }}</option>
    </select>
    <input type="text" v-model="value" />
    <blog-button v-if="addLink" create :text="$strings.add" :action="addRule" />
    <blog-button
      v-if="updateLink"
      create
      :text="$strings.update"
      :action="updateRule"
    />
    <blog-button
      v-if="deleteLink"
      destroy
      :text="$strings.delete"
      :action="showDeleteDialog"
    />
    <blog-confirmation-dialog
      :title="$strings.deleteFilterRule"
      :message="$strings.confirmDeleteFilterRule"
      :isOpen="deleteDialogIsOpen"
    >
      <blog-button destroy :text="$strings.yes" :action="deleteRule" />
      <blog-button :text="$strings.no" :action="hideDeleteDialog" />
    </blog-confirmation-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";
import BlogButton from "@/components/BlogButton";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-filter-rule",

  props: {
    links: Array,
    initial: { type: Object },
    filterId: { type: String }
  },

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

  computed: {
    ...mapState(["filters"]),

    addLink() {
      return this.link("POST", "filterRule");
    },

    updateLink() {
      return this.link("PUT", "filterRule");
    },

    deleteLink() {
      return this.link("DELETE", "filterRule");
    },

    payload() {
      return {
        filter: this.filterId,
        id: this.id,
        type: this.type,
        operator: this.operator,
        value: this.value
      };
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "addFilterRule",
      "deleteFilterRule",
      "updateFilterRule",
      "apiRequest"
    ]),

    ...mapMutations(["setFilters"]),

    reset() {
      this.type = this.initial ? this.initial.type : this.types[0];
      this.operator = this.initial ? this.initial.operator : this.operators[0];
      this.value = this.initial ? this.initial.value : "";
    },

    async addRule() {
      const { filterRule } = await this.apiRequest({
        ...this.addLink,
        body: this.payload
      });
      this.setFilters({
        filters: [
          ...this.filters.map(filter => ({
            ...filter,
            rules: [...filter.rules, filterRule]
          }))
        ]
      });
      this.reset();
    },

    async updateRule() {
      const { filterRule } = await this.apiRequest({
        ...this.updateLink,
        body: this.payload
      });
      this.setFilters({
        filters: [
          ...this.filters.map(filter => ({
            ...filter,
            rules: [
              ...filter.rules.map(rule =>
                rule.id === this.id ? filterRule : rule
              )
            ]
          }))
        ]
      });
    },

    async deleteRule() {
      await this.apiRequest(this.deleteLink);
      this.setFilters({
        filters: [
          ...this.filters.map(filter => ({
            ...filter,
            rules: [...filter.rules.filter(rule => rule.id !== this.id)]
          }))
        ]
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
