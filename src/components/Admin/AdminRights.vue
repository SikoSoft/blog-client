<template>
  <div class="admin-rights">
    <select @change="changeRole">
      <option value="0">{{ $strings.selectARole }}</option>
      <option v-for="role in roles" :key="role.id" :value="role.id">{{
        role.name
      }}</option>
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
              :action="deleteRight"
              :text="$strings.deleteRight"
            />
          </td>
        </tr>
      </table>

      <select v-model="newRight">
        <option>{{ $strings.selectARight }}</option>
        <optgroup
          v-for="groupName in Object.keys(rights)"
          :key="groupName"
          :label="groupName"
        >
          <option
            v-for="right in rights[groupName]"
            :key="right"
            :value="right"
            >{{ right }}</option
          >
        </optgroup>
      </select>
      <blog-button create :action="addRight" :text="$strings.addRight" />
    </div>
  </div>
</template>

<script>
import rights from "@/data/rights.json";

import BlogButton from "@/components/BlogButton";

export default {
  name: "admin-rights",

  components: {
    BlogButton
  },

  props: ["role"],

  data() {
    return {
      rights,
      newRight: ""
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
    changeRole(e) {
      if (parseInt(e.target.value) !== 0) {
        this.$router.push({ path: `/admin/rights/${e.target.value}` });
      }
    },

    deleteRight() {},

    addRight() {}
  }
};
</script>

<style lang="scss" scoped></style>
