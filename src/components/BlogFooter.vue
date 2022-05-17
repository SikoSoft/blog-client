<template>
  <div class="blog-footer">
    <div class="blog-footer__inner">
      {{ poweredBy }}
    </div>
  </div>
</template>

<script>
import { version, displayName } from "blog-spec";
import { parseVars } from "@/util/strings.js";

export default {
  name: "blog-footer",

  computed: {
    poweredBy() {
      return parseVars(this.$strings.poweredByStatement, {
        version,
        displayName
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.blog-footer {
  border-top: 1px $color-border-secondary solid;
  margin-top: $space;
  font-size: $font-large;
  padding: 6rem 0;
  background-color: #000;

  &__inner {
    @include container-width;
  }
}
</style>
