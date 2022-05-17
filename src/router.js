import Vue from "vue";
import Router from "vue-router";
import Entries from "./views/Entries.vue";
import Entry from "./views/Entry.vue";
import Tags from "./views/Tags.vue";
import Tag from "./views/Tag.vue";
import Token from "./views/Token.vue";
import Settings from "./views/Settings.vue";
import Roles from "./views/Roles.vue";
import Rights from "./views/Rights.vue";
import TagPolicies from "./views/TagPolicies.vue";
import Tokens from "./views/Tokens.vue";
import AccessDenied from "./views/AccessDenied.vue";
import Admin from "./views/Admin.vue";
import Filters from "./views/Filters.vue";
import Filter from "./views/Filter.vue";
import Images from "./views/Images.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "entries",
      component: Entries
    },
    {
      path: "/entry/:id",
      name: "entry",
      component: Entry
    },
    {
      path: "/draft/:id",
      name: "draft",
      component: Entry
    },
    {
      path: "/tags",
      name: "tags",
      component: Tags
    },
    {
      path: "/tag/:tag",
      name: "tag",
      component: Tag
    },
    {
      path: "/token/:token?",
      name: "token",
      component: Token
    },
    {
      path: "/logout",
      redirect: () => {
        localStorage.removeItem("sessToken");
        localStorage.removeItem("authToken");
        return "/";
      }
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin
    },
    {
      path: "/admin/images",
      name: "images",
      component: Images
    },
    {
      path: "/admin/settings",
      name: "settings",
      component: Settings
    },
    {
      path: "/admin/roles",
      name: "roles",
      component: Roles
    },
    {
      path: "/admin/rights/:role?",
      name: "rights",
      component: Rights
    },
    {
      path: "/admin/tokens",
      name: "tokens",
      component: Tokens
    },
    {
      path: "/admin/filters",
      name: "filters",
      component: Filters
    },
    {
      path: "/admin/tag_policies/:tag?",
      name: "tag-policies",
      component: TagPolicies
    },
    {
      path: "/access_denied",
      name: "access-denied",
      component: AccessDenied
    },
    {
      path: "/filter/:filter",
      name: "entries-filter",
      component: Filter
    }
  ]
});
