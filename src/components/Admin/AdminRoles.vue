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
        <td>
          <blog-button
            destroy
            :action="showDeleteDialog"
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
            deleteRole({ filterId, id });
          }
        "
      />
      <blog-button :text="$strings.no" :action="hideDeleteDialog" />
    </blog-confirmation-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import BlogButton from "@/components/BlogButton";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";

export default {
  name: "admin-roles",

  data() {
    return {
      deleteDialogIsOpen: false
    };
  },

  components: { BlogButton, BlogConfirmationDialog },

  computed: {
    ...mapGetters(["roles", "user"])
  },

  methods: {
    deleteRole() {},

    hideDeleteDialog() {
      this.deleteDialogIsOpen = false;
    },

    showDeleteDialog() {
      this.deleteDialogIsOpen = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
