import Vue from "vue";
import Router from "vue-router";
import Entries from "./views/Entries";
import Entry from "./views/Entry";
import Tags from "./views/Tags";
import Tag from "./views/Tag";
import Token from "./views/Token";
import Settings from "./views/Settings";
import Roles from "./views/Roles";
import Rights from "./views/Rights";
import TagPolicies from "./views/TagPolicies";
import Tokens from "./views/Tokens";
import AccessDenied from "./views/AccessDenied";
import Admin from "./views/Admin";
import Filters from "./views/Filters";
import Filter from "./views/Filter";
import Images from "./views/Images";
import Banners from "./views/Banners";
import Blocks from "./views/Blocks";

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
      name: "roleRights",
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
      name: "tagRoles",
      component: TagPolicies
    },
    {
      path: "/admin/banners/:banner?",
      name: "banners",
      component: Banners
    },
    {
      path: "/admin/blocks/:block?",
      name: "blocks",
      component: Blocks
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
