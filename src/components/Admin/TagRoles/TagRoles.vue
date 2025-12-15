<template>
  <div class="admin-tag-policies">
    <blog-tag-input
      @tagChanged="tagChanged"
      @tagEntered="tagEntered"
      @newLinks="setAddLinks"
      :clearOnEnter="false"
      :initialValue="tag"
      :tagsToFilter="[]"
      :links="links"
    />
    <div v-if="tag">
      <template v-if="tagRoles.length">
        {{ tagName }}
        <table>
          <tr v-for="tagRole in tagRoles" :key="tagRole.role">
            <td>{{ roleName(tagRole.role) }}</td>
            <td>
              <blog-button
                destroy
                :action="
                  () => {
                    deleteRole(tagRole);
                  }
                "
                :text="$strings.delete"
              />
            </td>
          </tr>
        </table>
      </template>
      <div>
        <select v-model="role">
          <option value="0">{{ $strings.selectOption }}</option>
          <option
            v-for="role in roles"
            :key="role.id"
            :value="role.id"
            :disabled="tagRoleExists(role.id)"
            >{{ role.name }}</option
          >
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
    tag: String,
    tagRoles: Array,
    links: Array
  },

  data() {
    return {
      role: 0,
      addLinks: []
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

    setAddLinks(links) {
      this.addLinks = links;
    },

    tagChanged({ tag }) {
      this.$router.push({ path: `/admin/tag_policies/${tag}` });
    },

    tagEntered() {},

    addRole() {
      this.addTagRole({ tag: this.tag, role: this.role, links: this.addLinks });
    },

    deleteRole(tagRole) {
      this.deleteTagRole({
        tag: this.tag,
        role: tagRole.role,
        links: tagRole.links
      });
    },

    tagRoleExists(roleId) {
      return (
        this.tagRoles.filter(
          tagRole => tagRole.tag === this.tag && tagRole.role === roleId
        ).length > 0
      );
    },

    roleName(id) {
      return this.roles.filter(role => role.id === id)[0].name;
    }
  }
};
</script>
