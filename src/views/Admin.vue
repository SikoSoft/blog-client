<template>
  <div class="admin">
    <admin-home />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import AdminHome from "@/components/Admin/AdminHome.vue";

export default {
  name: "admin",

  components: { AdminHome },

  computed: {
    ...mapGetters(["initialized"])
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
