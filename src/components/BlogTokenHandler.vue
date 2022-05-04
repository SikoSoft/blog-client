<template>
  <form class="blog-token-handler" @submit="useToken">
    <input
      class="blog-token-handler__token"
      type="text"
      v-model="token"
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
import { mapGetters, mapActions } from "vuex";

import BlogButton from "@/components/BlogButton.vue";

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
      token: ""
    };
  },

  computed: {
    ...mapGetters(["links", "headers"])
  },

  methods: {
    ...mapActions(["initialize", "addToast"]),

    useToken(event) {
      fetch(this.links.useToken.href, {
        method: this.links.useToken.method,
        headers: this.headers,
        body: JSON.stringify({ token: this.token })
      })
        .then(response => response.json())
        .then(json => {
          if (!json.errorCode) {
            localStorage.setItem("sessToken", json.sessToken);
            if (json.authToken) {
              localStorage.setItem("authToken", json.authToken);
            }
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
