import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Toast from "components/common/toast";
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

/* 安装Toast插件 */
Vue.use(Toast);
FastClick.attach(document.body)
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
