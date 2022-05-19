<template>
  <div class="admin-tag-policies">
    <blog-tag-input
      @tagChanged="tagChanged"
      @tagEntered="tagEntered"
      :tagsToFilter="[]"
    />
    <div v-if="tag">
      {{ tagName }}
      <table>
        <tr v-for="tagRole in tagRoles" :key="tagRole.role">
          <td>{{ roleName(tagRole.role) }}</td>
          <td>
            <blog-button
              destroy
              :action="
                () => {
                  deleteRole(tagRole.role);
                }
              "
              :text="$strings.delete"
            />
          </td>
        </tr>
      </table>

      <div>
        <select v-model="role">
          <option value="0">{{ $strings.selectOption }}</option>
          <option v-for="role in roles" :key="role.id" :value="role.id">{{
            role.name
          }}</option>
        </select>
        <blog-button create :action="addRole" :text="$strings.add" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BlogButton from "@/components/BlogButton";
import BlogTagInput from "@/components/BlogTagInput";
import { parseVars } from "@/util/strings.js";

export default {
  name: "admin-tag-policies",

  components: {
    BlogButton,
    BlogTagInput
  },

  props: {
    tag: { type: String },
    tagRoles: { type: Array }
  },

  data() {
    return {
      role: 0
    };
  },

  computed: {
    ...mapState(["roles"]),

    tagName() {
      return parseVars(this.$strings.rolesWithTagAccess, { tag: this.tag });
    }
  },

  methods: {
    ...mapActions(["addTagRole", "deleteTagRole"]),

    tagChanged({ tag }) {
      this.$router.push({ path: `/admin/tag_policies/${tag}` });
    },

    tagEntered() {},

    addRole() {
      this.addTagRole({ tag: this.tag, role: this.role });
    },

    deleteRole(role) {
      this.deleteTagRole({ tag: this.tag, role });
    },

    roleName(id) {
      return this.roles.filter(role => role.id === id)[0].name;
    }
  }
};
</script>

<style lang="scss" scoped></style>
