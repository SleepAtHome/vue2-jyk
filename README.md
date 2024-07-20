# vue2-jyk

# 景元奎的Vue2 工具项目
## 搭建步骤
Vue 配置Node.js 环境 并创建Vue项目

1. 下载NodeJS
https://nodejs.p2hp.com/#google_vignette

2. 安装NodeJS

配置环境变量:D:\source\nodeJS\node_modules


3. 验证NodeJS：cmd中运行命令：
node -v

C:\Users\jing>node -v
v14.17.6


4.  配置npm源
npm cache clean --force
npm config set registry https://registry.npmmirror.com
npm config get registry


5. 安装 Vue CLI
npm install -g @vue/cli
（npm install -g @vue/cli --force）

6. 创建项目
vue create vue2-jyk

依次选择：
> Default ([Vue 2] babel, eslint)


…or push an existing repository from the command line
git remote add origin https://github.com/SleepAtHome/vue2-jyk.git
git branch -M main
git push -u origin main





## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
