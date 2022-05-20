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
import { mapActions, mapState } from "vuex";
import AdminTagPolicies from "@/components/Admin/AdminTagPolicies";

export default {
  name: "tag-policies",

  components: { AdminTagPolicies },

  props: {
    links: Array
  },

  data() {
    return {
      tagRolesFetching: false,
      tagRolesFetched: false
    };
  },

  mounted() {
    this.addContext({ id: "view", props: ["tagRoles"] });
    this.update();
  },

  updated() {
    this.update();
  },

  computed: {
    ...mapState(["tagRoles", "initialized", "user"]),

    tag() {
      return this.$route.params.tag;
    }
  },

  methods: {
    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "getTagRoles",
      "addContext"
    ]),

    async update() {
      await this.initialize();
      this.setBreadcrumbs([
        { href: "/admin", label: this.$strings.admin },
        { href: "/admin/tag_policies", label: this.$strings.tagPolicies }
      ]);
      this.setTitle(this.$strings.tagPolicies);
      if (!this.tagRolesFetching) {
        this.tagRolesFetching = true;
        await this.getTagRoles({ links: this.links });
        this.tagRolesFetched = true;
      }
    }
  },

  watch: {
    initialized() {
      if (!this.user.rights.includes("manage_roles")) {
        this.$router.push({ path: "/access_denied" });
      }
    }
  }
};
</script>
