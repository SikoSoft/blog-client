<template>
  <div class="admin-home">
    <ul class="admin-home__list">
      <li v-for="tool in tools" :key="tool">
        <router-link :to="`/admin/${tool}`">{{
          $strings.rightsLabels[`manage_${tool}`]
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
        "tokens"
      ]
    };
  },

  computed: {
    ...mapGetters(["user"]),

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
  }
};
</script>

<style lang="scss" scoped></style>
