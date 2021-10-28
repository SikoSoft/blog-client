<template>
  <div class="admin-roles">
    <admin-role
      v-for="role in roles"
      :key="role.id"
      :id="role.id"
      :initialName="role.name"
    />

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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import BlogButton from "@/components/BlogButton";
import AdminRole from "@/components/Admin/AdminRole";

export default {
  name: "admin-roles",

  data() {
    return {
      newRoleName: ""
    };
  },

  components: { BlogButton, AdminRole },

  computed: {
    ...mapGetters(["roles", "user", "settings"])
  },

  methods: {
    ...mapActions(["addRole", "updateRole"]),

    reqAddRole() {
      this.addRole({ name: this.newRoleName }).then(() => {
        this.newRoleName = "";
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
