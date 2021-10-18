<template>
  <div class="tokens">
    <admin-tokens v-if="initialized" v-bind="tokens" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import AdminTokens from "@/components/Admin/AdminTokens.vue";

export default {
  name: "tokens",

  components: { AdminTokens },

  mounted() {
    this.initialize().then(() => {
      this.setBreadcrumbs([
        { href: "/admin", label: this.$strings.admin },
        { href: "/admin/tokens", label: this.$strings.tokens },
      ]);
      this.setTitle(this.$strings.tokens);
    });
  },

  computed: {
    ...mapGetters(["initialized", "user", "tokens"]),

    settings() {
      return this.$store.getters.tokens;
    },
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle"]),
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_tokens")) {
        this.$router.push({ path: "/access_denied" });
      }
    },
  },
};
</script>
