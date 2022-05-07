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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
@import "@/styles/mixins";

.blog-footer {
  border-top: $size-border $color-border-primary solid;
  margin-top: $space;
  font-size: $font-large;
  padding: 5rem 0;
  background-color: $color-bg-secondary;

  &__inner {
    @include container-width;
  }
}
</style>
