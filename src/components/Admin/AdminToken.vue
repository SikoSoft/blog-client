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
            :text="$strings.updateToken"
            :action="updateToken"
            create
          /><blog-button
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
import { mapActions, mapMutations } from "vuex";
import BlogRoleSelector from "@/components/BlogRoleSelector.vue";
import BlogConfirmationDialog from "@/components/BlogConfirmationDialog.vue";
import BlogToggle from "@/components/BlogToggle.vue";
import BlogButton from "@/components/BlogButton.vue";

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
      consumed: this.initial.consumed ? this.initial.consumed : 0
    };
  },

  methods: {
    ...mapActions(["apiRequest", "addToast"]),

    ...mapMutations(["setTokens"]),

    showDeleteDialog() {
      this.deleteDialogIsOpen = true;
    },

    hideDeleteDialog() {
      this.deleteDialogIsOpen = false;
    },

    async updateToken() {
      const { token } = await this.apiRequest({
        ...this.links.update,
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
      await this.apiRequest(this.links.delete);
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

<style lang="scss" scoped></style>
