/****************************************************************
 * created by Celsius on 2020-08-11 for application entry file
 ****************************************************************/

/** 引入vue 库 */
import Vue from "vue";

/** 引入 main 样式文件 */
import "@/styles/main";

/** 引入主Vue 对象 */
import IndexView from "@/pages/Index";

/** 导入组件全局组件 */
import MisComponent from "./components/index";

/** 注册插件 */
Vue.use(MisComponent);

/** 引入Element 组件 */
import ElementUI from "element-ui";

/** 注册Element 组件 */
Vue.use(ElementUI);

/** 引入Element 组件主题样式 */
import "element-ui/lib/theme-chalk/index.css";

/** 引入路由组件 vue-router */
import Router from "vue-router";

/** 注册路由插件 */
Vue.use(Router);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/** 导入路由配置文件 */
import router from "./routes/index.js";

/** 导入状态库配置文件 */
import store from "./store/index.js";

/** vue 对象 */
new Vue({
    el: '#mainContent',
    router,
    store: store,
    data() {
        return {
            eventBus: new Vue()
        }
    },
    render(createElement) {
        let layout = this.$route.meta.layout;
        layout = layout ? layout : this.$route.path === '/' ? '' : 'main-layout';
        return createElement(IndexView, {props: {layout: layout}});
    }
});