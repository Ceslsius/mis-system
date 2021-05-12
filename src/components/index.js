/****************************************************************
 * created by Celsius on 2020-08-11 for blank layout file
 ****************************************************************/

/** 导入默认布局组件 */
import BlankLayout from "./layout/BlankLayout";

/** 导入主要布局组件 */
import MainLayout from "./layout/MainLayout";

/** 导入弹出框组件 */
import BaseModal from "./modal/BaseModal";

export default {
    /** 在Vue 中加载一个plugin（插件）需要对象中有一个install方法的实现 */
    install(Vue) {

        // 注册为一个Vue 组件
        Vue.component('BlankLayout', BlankLayout);

        // 注册为一个Vue 组件
        Vue.component('MainLayout', MainLayout);

        // 注册为一个Vue 组件
        Vue.component('BaseModal', BaseModal);
    }
}