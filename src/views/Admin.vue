<template>
  <div class="admin">
    <admin-home v-if="initialized" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminHome from "@/components/Admin/AdminHome.vue";

export default {
  name: "admin",

  components: { AdminHome },

  computed: {
    ...mapState(["initialized"])
  },

  mounted() {
    this.update();
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle"]),

    update() {
      this.initialize().then(() => {
        this.setBreadcrumbs([{ href: "/admin", label: this.$strings.admin }]);
        this.setTitle(this.$strings.admin);
      });
    }
  }
};
</script>
