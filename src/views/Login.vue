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

    ...mapActions(["initialize", "useToken", "setBreadcrumbs", "setTitle"]),

    async update() {
      await this.initialize();
      this.setBreadcrumbs([{ href: "/login/", label: this.$strings.login }]);
      this.setTitle(this.$strings.login);
    },

    userLoggedIn(e) {
      console.log("User logged in", e);
      const user = e.detail;
      sessionStorage.setItem("accessToken", user.authToken);
    }
  }
};
</script>
