<template>
  <div class="tag-policies">
    <admin-tag-policies
      v-if="initialized && tagRolesLinks.length"
      :tag="tag"
      :tagRoles="tagRoles.filter(tagRole => tagRole.tag === tag)"
      :links="tagRolesLinks"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdminTagPolicies from "@/components/Admin/AdminTagPolicies";
import linkHandlers from "@/shared/linkHandlers";

export default {
  name: "tag-policies",

  components: { AdminTagPolicies },

  props: {
    links: Array
  },

  data() {
    return {
      firstUpdate: true,
      tagRolesLinks: []
    };
  },

  mounted() {
    this.addContext({ id: "view", props: ["tagRoles"] });
    this.update();
  },

  updated() {
    //this.update();
  },

  computed: {
    ...mapState(["tagRoles", "initialized", "user"]),

    tag() {
      return this.$route.params.tag;
    }
  },

  methods: {
    ...linkHandlers,

    ...mapActions([
      "initialize",
      "setBreadcrumbs",
      "setTitle",
      "getTagRoles",
      "addContext"
    ]),

    async update() {
      if (this.firstUpdate) {
        await this.initialize();
        this.setBreadcrumbs([
          { href: "/admin", label: this.$strings.admin },
          { href: "/admin/tag_policies", label: this.$strings.tagPolicies }
        ]);
        this.setTitle(this.$strings.tagPolicies);
        this.tagRolesFetching = true;
        const response = await this.getTagRoles({ links: this.links });
        this.tagRolesLinks = response.links;
        this.firstUpdate = false;
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
