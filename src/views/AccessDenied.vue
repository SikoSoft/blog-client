<template>
  <div class="access-denied">
    {{ $strings.accessDeniedLong }}
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "access-denied",

  mounted() {
    this.initialize().then(() => {
      this.setBreadcrumbs([]);
      this.setTitle(this.$strings.accessDenied);
    });
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle"])
  }
};
</script>
