<template>
  <div class="admin-tag-policies">
    <blog-tag-input
      @tagChanged="tagChanged"
      @tagEntered="tagEntered"
      :tagsToFilter="[]"
    />
    <div v-if="tag">
      {{ $strings.rolesWithTagAccess.replace("{tag}", tag) }}
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
import { mapActions, mapGetters } from "vuex";

import BlogButton from "@/components/BlogButton.vue";
import BlogTagInput from "@/components/BlogTagInput.vue";

export default {
  name: "admin-tag-policies",

  components: {
    BlogButton,
    BlogTagInput
  },

  props: ["tag", "tagRoles"],

  data() {
    return {
      role: 0
    };
  },

  computed: {
    ...mapGetters(["roles"])
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
