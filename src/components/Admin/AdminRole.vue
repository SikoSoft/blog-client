<template>
  <div class="admin-role">
    <table>
      <tr>
        <td>{{ id }}</td>
        <td>
          <input type="text" :placeholder="$strings.roleName" v-model="name" />
        </td>
        <td v-if="user.rights.includes('manage_rights')">
          <router-link :to="`/admin/rights/${id}`">{{
            $strings.manageRights
          }}</router-link>
        </td>
        <td v-if="!isProtected">
          <blog-button
            destroy
            :action="
              () => {
                reqDeleteRole();
              }
            "
            :text="$strings.deleteRole"
          />
        </td>
      </tr>
    </table>

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
            deleteRole({ id });
            hideDeleteDialog();
          }
        "
      />
      <blog-button :text="$strings.no" :action="hideDeleteDialog" />
    </blog-confirmation-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BlogButton from "@/components/BlogButton";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";

export default {
  name: "admin-role",

  components: {
    BlogButton,
    BlogConfirmationDialog
  },

  props: {
    id: { type: Number },
    initialName: { type: String }
  },

  data() {
    return {
      name: this.initialName,
      deleteDialogIsOpen: false,
      updateTimer: 0
    };
  },

  computed: {
    ...mapState(["user", "settings"]),

    isProtected() {
      return (
        [this.settings.role_admin, this.settings.role_guest].indexOf(this.id) >
        -1
      );
    }
  },

  methods: {
    ...mapActions(["deleteRole", "updateRole"]),

    reqDeleteRole() {
      this.showDeleteDialog();
    },

    hideDeleteDialog() {
      this.deleteDialogIsOpen = false;
    },

    showDeleteDialog() {
      this.deleteDialogIsOpen = true;
    }
  },

  watch: {
    name(newName) {
      if (this.updateTimer) {
        clearTimeout(this.updateTimer);
      }
      this.updateTimer = setTimeout(() => {
        this.updateRole({ id: this.id, name: newName });
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped></style>
