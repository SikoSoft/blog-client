<template>
  <div class="tag-policies">
    <admin-tag-policies
      v-if="initialized && tagRolesFetched"
      :tag="tag"
      :tagRoles="tagRoles.filter(tagRole => tagRole.tag === tag)"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import AdminTagPolicies from "@/components/Admin/AdminTagPolicies.vue";

export default {
  name: "tag-policies",

  components: { AdminTagPolicies },

  data() {
    return {
      tagRolesFetching: false,
      tagRolesFetched: false
    };
  },

  mounted() {
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    ...mapState(["tagRoles"]),

    ...mapGetters(["initialized", "user"]),

    tag() {
      return this.$route.params.tag;
    }
  },

  methods: {
    ...mapActions(["initialize", "setBreadcrumbs", "setTitle", "getTagRoles"]),

    update() {
      this.initialize().then(() => {
        this.setBreadcrumbs([
          { href: "/admin", label: this.$strings.admin },
          { href: "/admin/tag_policies", label: this.$strings.tagPolicies }
        ]);
        this.setTitle(this.$strings.tagPolicies);
        if (!this.tagRolesFetching) {
          this.tagRolesFetching = true;
          this.getTagRoles().then(() => {
            this.tagRolesFetched = true;
          });
        }
      });
    }
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_roles")) {
        this.$router.push({ path: "/accessDenied" });
      }
    }
  }
};
</script>
