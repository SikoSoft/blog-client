<template>
  <div class="admin-tokens">
    <admin-token
      v-for="token in tokens"
      :key="token.code"
      :initial="token"
      :links="token.links"
    />
    <fieldset>
      <legend>
        {{ $strings.newToken }}
      </legend>
      <admin-token :links="links" />
    </fieldset>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import AdminToken from "@/components/Admin/AdminToken";

export default {
  name: "admin-tokens",

  components: {
    AdminToken
  },

  props: {
    tokens: Array,
    links: Array
  },

  data() {
    return {
      code: "",
      oneTime: 0,
      role: 0
    };
  },

  methods: {
    ...mapActions(["apiRequest", "addToast"]),

    ...mapMutations(["setTokens"]),

    async addToken() {
      const { token } = await this.apiRequest({
        ...this.links.create,
        body: {
          code: this.code,
          one_time: this.oneTime,
          role: this.role
        }
      });
      this.setTokens({
        tokens: [...this.$store.state.tokens, token].sort((a, b) =>
          a.code < b.code ? -1 : a.code > b.code ? 1 : 0
        )
      });
      this.addToast(this.$strings.tokenAdded);
      this.code = "";
      this.oneTime = 0;
      this.role = 0;
    }
  }
};
</script>
