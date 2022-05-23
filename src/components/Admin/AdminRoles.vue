<template>
  <div class="admin-roles">
    <admin-role
      v-for="role in roles"
      :key="role.id"
      :id="role.id"
      :initialName="role.name"
      :links="role.links"
    />
    <fieldset>
      <legend>{{ $strings.newRole }}</legend>
      <admin-role :links="links" />
    </fieldset>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AdminRole from "@/components/Admin/AdminRole";

export default {
  name: "admin-roles",

  props: {
    links: Array
  },

  data() {
    return {
      newRoleName: ""
    };
  },

  components: { AdminRole },

  computed: {
    ...mapState(["roles", "user", "settings"])
  }
};
</script>
