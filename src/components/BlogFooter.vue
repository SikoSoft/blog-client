<template>
  <div class="blog-footer">
    <div class="blog-footer__inner">
      <template v-if="settings.show_powered_by">{{ poweredBy }}</template>
      <blog-block-injector
        v-if="settings.footer_block"
        :id="settings.footer_block"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { version, displayName } from "blog-spec";
import BlogBlockInjector from "@/components/BlogBlockInjector";
import { parseVars } from "@/util/strings.js";

export default {
  components: { BlogBlockInjector },
  name: "blog-footer",

  computed: {
    ...mapState(["settings"]),

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
@import "@theme/variables";
@import "@theme/mixins";

.blog-footer {
  border-top: 1px $color-secondary-border solid;
  margin-top: $space;
  font-size: $font-large;
  padding: 6rem 0;
  color: $color-footer-text;
  background-color: $color-footer-bg;

  &__inner {
    @include container-width;
  }
}
</style>
