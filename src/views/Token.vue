<template>
  <div class="token">
    <blog-token-handler />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BlogTokenHandler from "@/components/BlogTokenHandler";

export default {
  name: "tag",

  components: { BlogTokenHandler },

  computed: {},

  mounted() {
    this.update();
  },

  methods: {
    ...mapActions(["initialize", "useToken", "setBreadcrumbs", "setTitle"]),

    async update() {
      await this.initialize();
      this.setBreadcrumbs([
        { href: "/token/", label: this.$strings.authenticator }
      ]);
      this.setTitle(this.$strings.authenticator);
    }
  }
};
</script>
