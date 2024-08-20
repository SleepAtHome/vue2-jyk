# Vue 笔记

## Vue背景
MVVM模型：View/Model/ViewModel

解耦了前后端开发，前后端分离。

Vue框架是ViewModel层的实现者。

实现了双向绑定（数据）：关联View层和Model层。数据可以动态变化


Vue可以进行模块化编程：一个页面由几个模板组成。

## 生命周期
1. new Vue()

2. 初始化 事件&生命周期

3. beforeCreate：创建之前会进行一些钩子事件

4. 初始化 注入&校验

5. created()

6. 绑定Model和View (是则下一步)

是否指定 "el"(元素)             否——当调用vm.$mount(el)时下一步

是否指定 "template"选项         否——将el外部的HTML作为template编译

将template编译到render函数中(渲染)

7. beforeAmount

8. 创建vm.$el 并用其替换"el"

9. mounted()

10. 挂载完毕
当data被修改时：
    10.1 beforeUpdate
    10.2 虚拟dom重新渲染，并应用更新
    10.3 updated

11. 当调用vm.$destory()时： beforeDestory

12. 解除绑定，销毁子组件以及事件监听器

13. 销毁完毕 :  destoryed



## Vue路由
1. npm install --save vue-router@3
更新一下 vue-cli：npm update vue-cli
（代码中，如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能）

亲测：npm install vue-router运行时报错：
Cannot read properties of undefined (reading 'install')
不知道为啥...

## 登录态
首先，当你输入账号密码提交后，浏览器会将你的账号密码提交到家口服务器，接口服务器会对你所提交的账号密码进行验证，如果成功的话，会在后台生成一个加密的字符串（这个字符串就是token），并且会给token设置一个过期时间，一般时两个小时，几个小时都可以，甚至几天，几周都行。

服务器将token返回给浏览器后，页面得到token值后会进行本地存储，（vux，storage，cookie）。一般在vueX中存，因为

1.  vuex在内存中读取速度快，

2.有一套统一的API操作，方便调试，

3.vuex是响应式的，更改数据后，可以自动快速更新。

但是vuex不具有持久化，因为在内存中保存，一刷新就会丢失。接下来我们因该如何对vuex数据进行持久化存储？

1.在登陆成功以后，数据在vuex中，通过mutations修改时，通过localstorage和sessionstorage手动的塞进去。（这样可以很灵活的使用）（推荐自己写）

2.可以用第三方库进行操作，vuex-persis 或 vuex-persistedState。这两个库也是利用上述第一种原理。（这样方便简单）。用插件会少许多快乐。还是了解一下我手写的原理吧。

## Vuex
使用vuex：如果使用的是vue2版本，vuex4不适配，得卸载重新安装vuex3；
卸载：npm uninstall vuex
指定版本安装：npm install vuex@3


Vuex 中的主要核心概念如下：State，Mutation，Action，Getter

基础使用：
      state:定义定义全局共享数据
      getters:获取state中的数据
      mutations:向state中设置新的数据/修改数据,是一个同步阻塞
    高级：
      actions:向state中设置新的数据/修改数据,是一个异步
      modules:将store提取出来，作为单独文件
