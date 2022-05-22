<template>
  <form class="blog-token-handler" @submit="useToken">
    <input
      class="blog-token-handler__token"
      type="text"
      v-model="code"
      :placeholder="$strings.token"
      ref="input"
    />
    <blog-button
      class="blog-token-handler__activate"
      :text="$strings.activate"
      :action="useToken"
    />
  </form>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import BlogButton from "@/components/BlogButton";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "token-handler",

  components: { BlogButton },

  mounted() {
    if (this.$refs.input) {
      this.$refs.input.focus();
    }
  },

  data() {
    return {
      code: ""
    };
  },

  computed: {
    ...mapState(["links"]),

    ...mapGetters(["headers"])
  },

  methods: {
    ...linkHandlers,

    ...mapActions(["initialize", "addToast", "apiRequest"]),

    async useToken(event) {
      const response = await this.apiRequest({
        ...this.link("POST", "useToken"),
        body: { code: this.code }
      });
      if (!response.errorCode) {
        localStorage.setItem("sessToken", response.sessToken);
        if (response.authToken) {
          localStorage.setItem("authToken", response.authToken);
        }
        await this.initialize(true);
        this.$router.push({ path: `/` });
      } else {
        this.addToast(this.$strings.errors[`CODE_${response.errorCode}`]);
      }
      event.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-token-handler {
  padding: 2rem;
  text-align: center;

  &__token {
    font-size: 2rem;
  }

  &__activate {
    font-size: 2rem;
  }
}
</style>
