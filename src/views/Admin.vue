<template>
  <div class="admin">
    <admin-home v-if="initialized" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdminHome from "@/components/Admin/AdminHome";

export default {
  name: "admin",

  components: { AdminHome },

  computed: {
    ...mapState(["initialized"])
  },

  async mounted() {
    await this.addContext({ id: "view", props: ["admin"] });
    this.update();
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle", "addContext"]),

    async update() {
      //await this.initialize();
      this.setBreadcrumbs([{ href: "/admin", label: this.$strings.admin }]);
      this.setTitle(this.$strings.admin);
    }
  }
};
</script>
