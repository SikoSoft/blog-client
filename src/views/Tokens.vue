<template>
  <div class="tokens">
    <admin-tokens v-if="initialized" :tokens="tokens" :links="tokensLinks" />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import AdminTokens from "@/components/Admin/AdminTokens";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "tokens",

  components: { AdminTokens },

  props: {
    links: Array
  },

  data() {
    return {
      context: { id: "view", props: ["tokens"] },
      tokensLinks: []
    };
  },

  async mounted() {
    await this.addContext(this.context);
    await this.initialize();
    this.setBreadcrumbs([
      { href: "/admin", label: this.$strings.admin },
      { href: "/admin/tokens", label: this.$strings.tokens }
    ]);
    this.setTitle(this.$strings.tokens);
    const response = await this.apiRequest(this.link("GET", "tokens"));
    if (response.tokens) {
      this.setTokens({ tokens: response.tokens });
    }
    if (response.links) {
      this.tokensLinks = response.links;
    }
  },

  computed: {
    ...mapState(["initialized", "user", "tokens"]),

    tokens() {
      return this.$store.state.tokens;
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "apiRequest",
      "addContext"
    ]),

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
