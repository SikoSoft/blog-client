<template>
  <div class="login">
    <login-form env="development" @user-logged-in="userLoggedIn"></login-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "login",

  components: {},

  computed: {},

  mounted() {
    this.update();
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      "useToken",
      "setBreadcrumbs",
      "setTitle",
      "addToast"
    ]),

    async update() {
      await this.initialize();
      this.setBreadcrumbs([{ href: "/login/", label: this.$strings.login }]);
      this.setTitle(this.$strings.login);
    },

    userLoggedIn(e) {
      const user = e.detail;
      if (user.roles.includes("blog-admin")) {
        localStorage.setItem("sessToken", user.authToken);
        this.initialize();
        this.$router.push({ path: "/" });
        this.addToast(this.$strings.loginSuccess);
        return;
      }

      this.addToast(this.$strings.loginFailed);
    }
  }
};
</script>
