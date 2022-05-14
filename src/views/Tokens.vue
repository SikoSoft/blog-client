<template>
  <div class="tokens">
    <admin-tokens v-if="initialized" :tokens="tokens" :links="tokensLinks" />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

import AdminTokens from "@/components/Admin/AdminTokens.vue";

export default {
  name: "tokens",

  components: { AdminTokens },

  data() {
    return {
      tokensLinks: {}
    };
  },

  async mounted() {
    await this.initialize();
    this.setBreadcrumbs([
      { href: "/admin", label: this.$strings.admin },
      { href: "/admin/tokens", label: this.$strings.tokens }
    ]);
    this.setTitle(this.$strings.tokens);
    const response = await this.apiRequest(this.links.getTokens);
    if (response.tokens) {
      this.setTokens({ tokens: response.tokens });
    }
    if (response.links) {
      this.tokensLinks = response.links;
    }
  },

  computed: {
    ...mapState(["initialized", "user", "tokens", "links"]),

    tokens() {
      return this.$store.state.tokens;
    }
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle", "apiRequest"]),

    ...mapMutations(["setTokens"])
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_tokens")) {
        this.$router.push({ path: "/access_denied" });
      }
    }
  }
};
</script>
