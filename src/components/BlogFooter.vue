<template>
  <div class="blog-footer">
    <div class="blog-footer__inner">
      {{ poweredBy }}
    </div>
  </div>
</template>

<script>
import { version } from "blog-spec";
import { parseVars } from "@/util/strings.js";

export default {
  name: "blog-footer",

  computed: {
    poweredBy() {
      return parseVars(this.$strings.poweredByStatement, { version });
      //return this.$strings.poweredByStatement.replace("{version}", version);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.blog-footer {
  font-size: $font-large;
  padding: 5rem 0;
  background-color: $color-bg-secondary;

  &__inner {
    @include container-width;
  }
}
</style>
