<template>
  <div class="admin-roles">
    <table>
      <tr v-for="role in roles" :key="role.id">
        <td>{{ role.id }}</td>
        <td>
          <input
            type="text"
            :placeholder="$strings.roleName"
            :value="role.name"
          />
        </td>
        <td v-if="user.rights.includes('manage_rights')">
          <router-link :to="`/admin/rights/${role.id}`">{{
            $strings.manageRights
          }}</router-link>
        </td>
        <td
          v-if="
            [settings.role_admin, settings.role_guest].indexOf(role.id) === -1
          "
        >
          <blog-button
            destroy
            :action="
              () => {
                reqDeleteRole(role.id);
              }
            "
            :text="$strings.deleteRole"
          />
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <td>
          <input
            type="text"
            :placeholder="$strings.roleName"
            v-model="newRoleName"
          />
        </td>

        <td>
          <blog-button create :action="reqAddRole" :text="$strings.addRole" />
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
            reqDeleteRole({ id });
          }
        "
      />
      <blog-button :text="$strings.no" :action="hideDeleteDialog" />
    </blog-confirmation-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import BlogButton from "@/components/BlogButton";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";

export default {
  name: "admin-roles",

  data() {
    return {
      deleteDialogIsOpen: false,
      newRoleName: "",
      roleToDelete: -1,
    };
  },

  components: { BlogButton, BlogConfirmationDialog },

  computed: {
    ...mapGetters(["roles", "user", "settings"]),
  },

  methods: {
    ...mapActions(["addRole", "deleteRole", "updateRole"]),

    reqAddRole() {
      this.addRole({ name: this.newRoleName }).then(() => {
        this.newRoleName = "";
      });
    },

    reqDeleteRole(id) {
      this.roleToDelete = id;
      this.showDeleteDialog();
    },

    hideDeleteDialog() {
      this.deleteDialogIsOpen = false;
    },

    showDeleteDialog() {
      this.deleteDialogIsOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
