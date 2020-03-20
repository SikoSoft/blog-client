<template>
  <div class="token">
    <blog-token-handler />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import BlogTokenHandler from "@/components/BlogTokenHandler.vue";

export default {
  name: "tag",

  components: { BlogTokenHandler },

  computed: {},

  mounted() {
    this.update();
  },

  methods: {
    ...mapActions(["initialize", "useToken", "setBreadcrumbs", "setTitle"]),

    update() {
      this.initialize().then(() => {
        this.setBreadcrumbs([
          { href: "/token/", label: this.$strings.authenticator }
        ]);
        this.setTitle(this.$strings.authenticator);
      });
    }
  }
};
</script>
