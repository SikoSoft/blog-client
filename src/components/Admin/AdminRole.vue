<template>
  <div class="admin-role">
    <table>
      <tr>
        <td>{{ id }}</td>
        <td>
          <input type="text" :placeholder="$strings.roleName" v-model="name" />
        </td>
        <td v-if="manageLinks.length">
          <router-link :to="`/admin/rights/${id}`">{{
            $strings.manageRights
          }}</router-link>
        </td>
        <td>
          <blog-button
            v-if="addLink"
            create
            :action="addRole"
            :text="$strings.add"
          />
          <blog-button
            v-if="updateLink"
            create
            :action="updateRole"
            :text="$strings.update"
          />
          <template v-if="!isProtected">
            <blog-button
              v-if="deleteLink"
              destroy
              :action="
                () => {
                  reqDeleteRole();
                }
              "
              :text="$strings.delete"
            />
          </template>
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
import { mapState, mapActions, mapMutations } from "vuex";
import BlogButton from "@/components/BlogButton";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-role",

  components: {
    BlogButton,
    BlogConfirmationDialog
  },

  props: {
    id: Number,
    initialName: String,
    links: Array
  },

  data() {
    return {
      name: this.initialName,
      deleteDialogIsOpen: false,
      updateTimer: 0
    };
  },

  computed: {
    ...mapState(["user", "settings", "roles"]),

    isProtected() {
      return (
        [this.settings.role_admin, this.settings.role_guest].indexOf(this.id) >
        -1
      );
    },

    addLink() {
      return this.link("POST", "role");
    },

    updateLink() {
      return this.link("PUT", "role");
    },

    deleteLink() {
      return this.link("DELETE", "role");
    },

    manageLinks() {
      return [];
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["deleteRole", "updateRole", "apiRequest"]),

    ...mapMutations(["setRoles"]),

    reqDeleteRole() {
      this.showDeleteDialog();
    },

    hideDeleteDialog() {
      this.deleteDialogIsOpen = false;
    },

    showDeleteDialog() {
      this.deleteDialogIsOpen = true;
    },

    async addRole() {
      const response = await this.apiRequest({
        ...this.addLink,
        body: { name: this.name }
      });
      this.setRoles({
        roles: [...this.roles, response.role]
      });
    },

    async updateRole() {
      await this.apiRequest({
        ...this.updateLink,
        body: { name: this.name }
      });
      this.setRoles({
        roles: [
          ...this.roles.map(role => ({
            ...role,
            name: role.id === this.id ? this.name : role.name
          }))
        ]
      });
    },

    async deleteRole() {
      await this.apiRequest(this.deleteLink);
      this.setRoles({
        roles: [...this.roles.filter(role => role.id !== this.id)]
      });
    }
  }
};
</script>
