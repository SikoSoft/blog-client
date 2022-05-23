<template>
  <div class="admin-rights">
    <blog-role-selector @input="changeRole" :value="role" />

    <div v-if="role">
      <admin-right
        v-for="right in roleRights"
        :key="right.action"
        v-bind="right"
      />

      <select v-model="newAction">
        <option :selected="!newAction" value="">{{
          $strings.selectARight
        }}</option>
        <optgroup
          v-for="groupName in Object.keys(rightsGroups)"
          :key="groupName"
          :label="groupName"
        >
          <option
            v-for="action in rightsGroups[groupName]"
            :key="action"
            :value="action"
            :disabled="
              roleRights.filter(right => right.action === action).length > 0
            "
            >{{
              $strings.rightsLabels[action]
                ? $strings.rightsLabels[action]
                : action
            }}</option
          >
        </optgroup>
      </select>
      <blog-button create :action="addRight" :text="$strings.addRight" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import spec from "blog-spec";
import BlogButton from "@/components/BlogButton";
import BlogRoleSelector from "@/components/BlogRoleSelector";
import AdminRight from "@/components/Admin/AdminRight";
import linkHandlers from "@/shared/linkHandlers";

const rightsGroups = {
  entries: ["create_entry", "update_entry", "delete_entry", "view_draft"],
  comments: [
    "view_unpublished_comment",
    "publish_comment",
    "delete_comment",
    "post_comment"
  ],
  admin: [
    "manage_settings",
    "manage_roles",
    "manage_rights",
    "manage_tokens",
    "manage_tag_policies",
    "manage_filters"
  ]
};

rightsGroups.other = spec.rights
  .filter(right => {
    let match = false;
    for (let group of Object.keys(rightsGroups)) {
      if (
        rightsGroups[group].some(
          rightsInGroup => rightsInGroup.indexOf(right.id) > -1
        )
      ) {
        match = true;
      }
    }
    return !match;
  })
  .map(right => right.id);

export default {
  name: "admin-rights",

  components: {
    BlogButton,
    BlogRoleSelector,
    AdminRight
  },

  props: {
    role: Number,
    links: Array
  },

  data() {
    return {
      rightsGroups,
      spec,
      newAction: ""
    };
  },

  computed: {
    addLink() {
      return this.link("POST", "roleRight");
    },

    roleRights() {
      return this.$store.state.roleRights.filter(
        right => right.role === this.role
      );
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["addRoleRight", "deleteRoleRight", "apiRequest"]),

    ...mapMutations(["setRoleRights"]),

    changeRole(role) {
      if (role !== 0) {
        this.$router.push({ path: `/admin/rights/${role}` });
      }
    },

    async addRight() {
      await this.addRoleRight({
        links: this.linksByRel(this.role),
        action: this.newAction
      });
      this.newAction = "";
    }
  }
};
</script>
