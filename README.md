## MIS-SYSTEM

基于vue2的管理系统
后端使用node.js，附后端代码

### 技术栈

1. Node v.12.x
2. Vue v.2.6.x
3. webpack v.4.x

### 结构目录

```
|—— mis-system
    |—— public                                   // 启动静态文件
        |—— index.html                           // 首页文件
        |—— assets                               // 资源文件
    |—— src                                      // 开发库目录
        |—— main.js                              // 项目启动文件
        |—— util                                 // 项目启动文件
            |—— Ajax.js                          // 封装axios 请求
            |—— Tool.js                          // 封装常用工具方法
        |—— style                                // 样式文件
            |—— main.less                        // 页面通用的配置样式
            |—— common.less                      // 通用方法、颜色、尺寸定义
            |—— home/login.less                  // 登录页面样式
            |—— layout/index.less                // 布局页面样式，默认布局、主要布局
        |—— store/index.js                       // 项目状态管理库
        |—— routes/index.js                      // 路由管理库
        |—— pages                                // 视图开发库
            |—— Index.vue                        // 组件入口文件
            |—— common/BaseView.vue              // 常用方法、分页参数及方法定义，通过extends/mixins 引入使用
            |—— home                             // 所有的视图文件库
        |—— images                               // 项目图标
        |—— components                           // 组件、指令、过滤器
            |—— index.js                         // 暴露文件
            |—— layout/BlankLayout.vue           // 默认布局文件
            |—— layout/MainLayout.vue            // 主要布局文件
```
