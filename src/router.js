import Vue from "vue";
import Router from "vue-router";
import Entries from "./views/Entries.vue";
import Entry from "./views/Entry.vue";
import Tags from "./views/Tags.vue";
import Tag from "./views/Tag.vue";

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
      path: "/admin",
      redirect: () => {
        localStorage.setItem("token", "admin");
        return "/";
      }
    }
  ]
});
