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
      <table>
        <tr>
          <td>{{ $strings.code }}</td>
          <td>{{ $strings.oneTime }}</td>
          <td>{{ $strings.role }}</td>
          <td></td>
        </tr>
        <tr>
          <td><input type="text" v-model="code" /></td>
          <td><blog-toggle v-model="oneTime" /></td>
          <td><blog-role-selector v-model="role" /></td>
          <td>
            <blog-button create :text="$strings.addToken" :action="addToken" />
          </td>
        </tr>
      </table>
    </fieldset>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import AdminToken from "@/components/Admin/AdminToken";
import BlogButton from "@/components/BlogButton";
import BlogToggle from "@/components/BlogToggle";
import BlogRoleSelector from "@/components/BlogRoleSelector";

export default {
  name: "admin-tokens",

  components: {
    AdminToken,
    BlogButton,
    BlogToggle,
    BlogRoleSelector
  },

  props: {
    tokens: { type: Array },
    links: { type: Array }
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

<style lang="scss" scoped>
.admin-tokens {
}
</style>
