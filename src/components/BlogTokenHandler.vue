<template>
  <form class="blog-token-handler" @submit="useToken">
    <input
      class="blog-token-handler__token"
      type="text"
      v-model="token"
      :placeholder="$strings.token"
    />
    <blog-button
      class="blog-token-handler__activate"
      :text="$strings.activate"
      :action="useToken"
    />
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import BlogButton from "@/components/BlogButton.vue";

export default {
  name: "token-handler",

  components: { BlogButton },

  data() {
    return {
      token: ""
    };
  },

  computed: {
    ...mapGetters(["api", "headers"])
  },

  methods: {
    ...mapActions(["initialize", "addToast"]),

    useToken(event) {
      fetch(this.api.useToken.href, {
        method: this.api.useToken.method,
        headers: this.headers,
        body: JSON.stringify({ token: this.token })
      })
        .then(response => response.json())
        .then(json => {
          if (!json.errorCode) {
            localStorage.setItem("token", json.token);
            this.initialize(true).then(() => {
              this.$router.push({ path: `/` });
            });
          } else {
            this.addToast(this.$strings.errors[`CODE_${json.errorCode}`]);
          }
        });
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
