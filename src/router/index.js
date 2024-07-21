//1.导入VueRouter
import Vue from "vue";
import VueRouter from 'vue-router'
import HelloWord from "../components/HelloWorld.vue";
import Syntax from "../components/basic/Syntax.vue";


//2.使用路由
Vue.use(VueRouter);


//3.创建VueRouter的实例
const router = new VueRouter({
    //tips:不想要 #（锚点）就添加下面代码
    // mode:'history', 
    //4.配置路由信息
    routes :[
        {
            path: "/",
            name:'home',
            component: HelloWord,
        },
        {
            path: "/syntax",
            name:'Syntax',
            component: Syntax,
        },
        // {
        //   path: "/about",
        //   name:'anout',
        //   component: () => import("../components/About.vue"), //路由懒加载
        // },
      ]
})

//5.导出路由实例
export default router
