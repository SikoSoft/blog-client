<template>
  <div class="admin-right">
    <table>
      <tr>
        <td>
          {{
            $strings.rightsLabels[action]
              ? $strings.rightsLabels[action]
              : action
          }}
        </td>
        <td>
          <blog-button
            v-if="deleteLink"
            destroy
            :action="
              () => {
                showDeleteRightDialog();
              }
            "
            :text="$strings.deleteRight"
          />
        </td>
      </tr>
    </table>

    <blog-confirmation-dialog
      :title="$strings.deleteRight"
      :message="$strings.confirmDeleteRight"
      :isOpen="deleteDialogIsOpen"
    >
      <blog-button
        destroy
        :text="$strings.yes"
        :action="
          () => {
            deleteRight();
          }
        "
      />
      <blog-button :text="$strings.no" :action="hideDeleteDialog" />
    </blog-confirmation-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";
import BlogButton from "@/components/BlogButton";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-right",

  components: { BlogConfirmationDialog, BlogButton },

  props: {
    action: String,
    role: Number,
    links: Array
  },

  data() {
    return {
      deleteDialogIsOpen: false
    };
  },

  computed: {
    deleteLink() {
      return this.link("DELETE", "roleRight");
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["apiRequest"]),

    ...mapMutations(["setRoleRights"]),

    showDeleteRightDialog(right) {
      this.right = right;
      this.deleteDialogIsOpen = true;
    },

    hideDeleteDialog() {
      this.deleteDialogIsOpen = false;
    },

    async deleteRight() {
      await this.apiRequest(this.deleteLink);
      this.deleteDialogIsOpen = false;
      this.setRoleRights({
        roleRights: [
          ...this.$store.state.roleRights.filter(
            right => right.role !== this.role || right.action !== this.action
          )
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@theme/mixins";

.admin-right {
  @include admin-list-item;
}
</style>
