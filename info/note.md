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

