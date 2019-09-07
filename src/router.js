import Vue from "vue";
import Router from "vue-router";
import Entries from "./views/Entries.vue";
import Entry from "./views/Entry.vue";
import Tags from "./views/Tags.vue";
import Tag from "./views/Tag.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "entries",
      component: Entries
    },
    {
      path: "/entry/:date/:title",
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
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
