<template>
  <div class="admin-token">
    <table>
      <tr>
        <td>{{ $strings.code }}</td>
        <td>{{ $strings.oneTime }}</td>
        <td>{{ $strings.role }}</td>
        <td>{{ $strings.consumed }}</td>
        <td></td>
      </tr>
      <tr>
        <td><input type="text" v-model="code" /></td>
        <td><blog-toggle v-model="oneTime" /></td>
        <td><blog-role-selector v-model="role" /></td>
        <td>{{ consumed }}</td>
        <td>
          <blog-button
            v-if="addLink"
            :text="$strings.addToken"
            :action="addToken"
            create
          />
          <blog-button
            v-if="updateLink"
            :text="$strings.updateToken"
            :action="updateToken"
            create
          />
          <blog-button
            v-if="deleteLink"
            :text="$strings.deleteToken"
            :action="showDeleteDialog"
            destroy
          />
        </td>
      </tr>
    </table>

    <blog-confirmation-dialog
      :title="$strings.deleteToken"
      :message="$strings.confirmDeleteToken"
      :isOpen="deleteDialogIsOpen"
    >
      <blog-button destroy :text="$strings.yes" :action="deleteToken" />
      <blog-button :text="$strings.no" :action="hideDeleteDialog" />
    </blog-confirmation-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import BlogRoleSelector from "@/components/BlogRoleSelector";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog";
import BlogToggle from "@/components/BlogToggle";
import BlogButton from "@/components/BlogButton";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "admin-token",

  components: {
    BlogRoleSelector,
    BlogToggle,
    BlogButton,
    BlogConfirmationDialog
  },

  props: {
    initial: { type: Object },
    links: { type: Array }
  },

  data() {
    return {
      deleteDialogIsOpen: false,
      code: this.initial ? this.initial.code : "",
      oneTime: this.initial ? this.initial.one_time : 0,
      role: this.initial ? this.initial.role : 0,
      consumed: this.initial ? this.initial.consumed : 0
    };
  },

  computed: {
    ...mapState(["tokens"]),

    addLink() {
      return this.link("POST", "token");
    },

    updateLink() {
      return this.link("PUT", "token");
    },

    deleteLink() {
      return this.link("DELETE", "token");
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["apiRequest", "addToast"]),

    ...mapMutations(["setTokens"]),

    showDeleteDialog() {
      this.deleteDialogIsOpen = true;
    },

    hideDeleteDialog() {
      this.deleteDialogIsOpen = false;
    },

    async addToken() {
      const { token } = await this.apiRequest({
        ...this.addLink,
        body: {
          code: this.code,
          one_time: this.oneTime,
          role: this.role
        }
      });
      this.setTokens({
        tokens: [...this.tokens, token].sort((a, b) =>
          a.code < b.code ? -1 : a.code > b.code ? 1 : 0
        )
      });
      this.addToast(this.$strings.tokenAdded);
      this.code = "";
      this.oneTime = 0;
      this.role = 0;
    },

    async updateToken() {
      const { token } = await this.apiRequest({
        ...this.updateLink,
        body: {
          code: this.code,
          one_time: this.oneTime,
          role: this.role
        }
      });
      this.setTokens({
        tokens: [
          ...this.$store.state.tokens.filter(
            token => token.code !== this.initial.code
          ),
          token
        ].sort((a, b) => (a.code < b.code ? -1 : a.code > b.code ? 1 : 0))
      });
      this.addToast(this.$strings.tokenUpdated);
    },

    async deleteToken() {
      await this.apiRequest(this.deleteLink);
      this.setTokens({
        tokens: this.$store.state.tokens.filter(
          token => token.code !== this.code
        )
      });
      this.addToast(this.$strings.tokenDeleted);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@theme/mixins";

.admin-token {
  @include admin-list-item;
}
</style>
