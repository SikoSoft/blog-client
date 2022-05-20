<template>
  <div class="rights">
    <admin-rights v-if="initialized" :role="role" :links="rightsLinks" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdminRights from "@/components/Admin/AdminRights";

export default {
  name: "rights",

  components: { AdminRights },

  props: {
    links: Array
  },

  data() {
    return {
      isUpdating: false,
      firstUpdate: true,
      rightsLinks: []
    };
  },

  mounted() {
    this.addContext({ id: "view", props: ["roleRights"] });
    this.update();
  },

  updated() {
    //this.update();
  },

  computed: {
    ...mapState(["roleRights", "initialized", "user"]),

    role() {
      return parseInt(this.$route.params.role);
    }
  },

  methods: {
    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "getRoleRights",
      "addContext"
    ]),

    async update() {
      if (this.firstUpdate) {
        await this.initialize();
        this.setBreadcrumbs([
          { href: "/admin", label: this.$strings.admin },
          { href: "/admin/rights", label: this.$strings.rights }
        ]);
        this.setTitle(this.$strings.rights);
        const response = await this.getRoleRights({ links: this.links });
        this.rightsLinks = response.links;
        this.firstUpdate = false;
      }
    }
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_rights")) {
        this.$router.push({ path: "/access_denied" });
      }
    }
  }
};
</script>
