//1.导入VueRouter
import Vue from "vue";
import VueRouter from 'vue-router'
import HelloWord from "../components/HelloWorld.vue";
import Syntax from "../components/basic/Syntax.vue";
import If from "../components/basic/syntax/If.vue";
import List from "../components/basic/syntax/List.vue";
import On from "../components/basic/syntax/On.vue";
import FoodMenu from "../components/food/FoodMenu.vue";
import AxiosReq from "../components/basic/AxiosReq.vue";

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
            name:'foodMenu',
            component: FoodMenu,
        },
        {
            path: "/syntax",
            name:'Syntax',
            component: Syntax,
        },
        {
            path: "/syntax/if",
            name:'If',
            component: If,
        },
        {
            path: "/syntax/list",
            name:'List',
            component: List,
        },
        {
            path: "/syntax/on",
            name:'On',
            component: On,
        },
        {
            path: "/axios",
            name:'axios',
            component: AxiosReq,
        },
        {
            path: "/helloWorld",
            name:'home',
            component: HelloWord,
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
