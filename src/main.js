import Vue from 'vue'
import App from './App.vue'

//6.引入导出的路由
import router from './router/index'

// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入Axios
import axios from 'axios';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  //7.注册路由
  router,

  // 引入ElementUI
  el: '#app',

  render: h => h(App),
}).$mount('#app')
