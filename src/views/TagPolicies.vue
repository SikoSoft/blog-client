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
import AdminTagPolicies from "@/components/Admin/TagRoles/TagRoles";
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

  async updated() {
    this.update();
  },

  beforeDestroy() {
    this.removeContext(this.context);
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
      "addContext",
      "removeContext"
    ]),

    async update() {
      await this.initialize();
      if (this.firstUpdate && this.contextIsReady(this.context)) {
        this.firstUpdate = false;
        this.setBreadcrumbs([
          { href: "/admin", label: this.$strings.admin },
          { href: "/admin/tag_policies", label: this.$strings.tagPolicies }
        ]);
        this.setTitle(this.$strings.tagPolicies);
        this.tagRolesFetching = true;
        const response = await this.getTagRoles({ links: this.links });
        this.tagRolesLinks = response.links;
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
