<template>
  <div class="tag-policies">
    <admin-tag-policies
      v-if="initialized && contextIsReady(context)"
      :tag="tag"
      :tagRoles="tagRoles.filter(tagRole => tagRole.tag === tag)"
      :links="tagRolesLinks"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
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
      context: { id: "view", props: ["tagRoles"] },
      firstUpdate: true,
      tagRolesLinks: []
    };
  },

  created() {
    this.addContext(this.context);
  },

  async mounted() {
    this.update();
  },

  computed: {
    ...mapState(["tagRoles", "initialized", "user"]),

    ...mapGetters(["contextIsReady"]),

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
      if (this.firstUpdate && this.contextIsReady(this.context)) {
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
