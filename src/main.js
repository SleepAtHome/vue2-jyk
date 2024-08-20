import Vue from 'vue'
import App from './App.vue'

//6.引入导出的路由
import router from './router/index'

// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入Axios
import axios from 'axios';

// 引入store（Vuex）
import store from './store';

Vue.use(ElementUI);

Vue.config.productionTip = false;

// 格式化时间戳方法
Vue.filter('formatTimestamp', function(value) {
  if (value) {
    let date = null;
    // 处理ISO 8601字符串
    if (typeof value === 'string') {
      date = new Date(value);
    }
    // 处理时间戳
    if (typeof value === 'number') {
      date = new Date(value * 1000); 
    }
    const options = {
      year:'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric',
      second: 'numeric'
    };
    return date.toLocaleDateString(undefined, options);
  }
  return '';
})

new Vue({
  //7.注册路由
  router,
  // Vuex
  store,
  // 引入ElementUI
  el: '#app',

  render: h => h(App),
}).$mount('#app')
