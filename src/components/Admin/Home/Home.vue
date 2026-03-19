<template>
  <div class="admin-home">
    <ul class="admin-home__list">
      <li v-for="tool in tools" :key="tool">
        <router-link :to="`/admin/${tool}`">{{
          $strings.rightsLabels[`manage_${tool}`]
        }}</router-link>
      </li>
    </ul>

    <div class="logout">
      <button @click="logout">{{ $strings.logout }}</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "admin-home",

  data() {
    return {
      available: [
        "settings",
        "roles",
        "rights",
        "tag_policies",
        "filters",
        "tokens",
        "images",
        "banners",
        "blocks"
      ]
    };
  },

  computed: {
    ...mapState(["user"]),

    tools() {
      return this.available.filter(tool =>
        this.user.rights.includes(`manage_${tool}`)
      );
    }
  },

  watch: {
    tools() {
      if (!this.tools) {
        this.$router.push({ path: "/access_denied" });
      }
    }
  },

  methods: {
    ...mapActions(["initialize"]),

    logout() {
      //localStorage.removeItem("sessToken");
      localStorage.removeItem("sessToken");
      localStorage.removeItem("authToken");
      this.initialize(true);
      this.$router.push({ path: "/logout" });
    }
  }
};
</script>
