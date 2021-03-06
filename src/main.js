import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import strings from "./data/strings.json";
import RuntimeTemplateCompiler from "vue-runtime-template-compiler";

Vue.use(RuntimeTemplateCompiler);
Vue.config.productionTip = false;

Vue.mixin({
  beforeCreate() {
    this.$strings = strings;
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
