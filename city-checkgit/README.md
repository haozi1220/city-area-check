# city-check

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 实现思路：
```
    第一步：拿到后台数据，对后台进行解析拿到城市名数据
    第二步：安装汉字拼音转换文件js-pinyin,
        ```
            1.运行npm install js-pinyin --save-dev下载安装依赖
            2.在main.js里添加引用，注册为全局引用
            3.在组件里通过“this.$pinyin.方法”方式调用pinyinjs的方法
        ```
    第三步：将每一个城市转化为一个对象，添加pinyin、firstLetter并赋值,
    第四步：利用正则匹配不同输入内容，解析出不同城市内容并渲染页面。
```