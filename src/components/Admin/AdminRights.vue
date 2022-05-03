<template>
  <div class="admin-rights">
    <select @change="changeRole">
      <option value="0">{{ $strings.selectARole }}</option>
      <option
        v-for="r in roles"
        :key="r.id"
        :value="r.id"
        :selected="r.id === role"
        >{{ r.name }}</option
      >
    </select>

    <div v-if="role">
      <table>
        <tr v-for="right in roleRights" :key="right.action">
          <td>
            {{
              rightsNames[right.action]
                ? rightsNames[right.action]
                : right.action
            }}
          </td>
          <td>
            <blog-button
              destroy
              :action="
                () => {
                  showDeleteRightDialog(right.action);
                }
              "
              :text="$strings.deleteRight"
            />
          </td>
        </tr>
      </table>

      <select v-model="newAction">
        <option :selected="!newAction" value="">{{
          $strings.selectARight
        }}</option>
        <optgroup
          v-for="groupName in Object.keys(rights)"
          :key="groupName"
          :label="groupName"
        >
          <option
            v-for="action in Object.keys(rights[groupName])"
            :key="action"
            :value="action"
            :disabled="
              roleRights.filter(right => right.action === action).length > 0
            "
            >{{ rights[groupName][action] }}</option
          >
        </optgroup>
      </select>
      <blog-button create :action="addRight" :text="$strings.addRight" />

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
  </div>
</template>

<script>
import { mapActions } from "vuex";

import rights from "@/data/rights.json";

import BlogButton from "@/components/BlogButton";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";

export default {
  name: "admin-rights",

  components: {
    BlogButton,
    BlogConfirmationDialog
  },

  props: ["role"],

  data() {
    return {
      rights,
      newAction: "",
      action: "",
      deleteDialogIsOpen: false
    };
  },

  computed: {
    roles() {
      return this.$store.getters.roles;
    },

    roleRights() {
      return this.$store.state.roleRights.filter(
        right => right.role === this.role
      );
    },

    rightsNames() {
      return Object.keys(rights)
        .map(rightGroup => rights[rightGroup])
        .reduce((prev, next) => ({ ...prev, ...next }), {});
    }
  },

  methods: {
    ...mapActions(["addRoleRight", "deleteRoleRight"]),

    changeRole(e) {
      if (parseInt(e.target.value) !== 0) {
        this.$router.push({ path: `/admin/rights/${e.target.value}` });
      }
    },

    showDeleteRightDialog(action) {
      this.action = action;
      this.deleteDialogIsOpen = true;
    },

    deleteRight() {
      this.deleteRoleRight({ role: this.role, action: this.action }).then(
        () => {
          this.deleteDialogIsOpen = false;
        }
      );
    },

    hideDeleteDialog() {
      this.deleteDialogIsOpen = false;
    },

    addRight() {
      this.addRoleRight({
        role: this.role,
        action: this.newAction
      }).then(() => {
        this.newAction = "";
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
