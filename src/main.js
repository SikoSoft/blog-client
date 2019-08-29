import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import strings from "./data/strings.json";
import config from "./data/config.json";

Vue.config.productionTip = false;

Vue.mixin({
  beforeCreate() {
    this.$strings = strings;
    this.$config = config;
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
