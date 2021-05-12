/****************************************************************
 * created by Celsius on 2020-08-11 for routes entry file
 ****************************************************************/

import Router from "vue-router";

/** 引入主页Home */
const HomeIndex = () => import("../pages/home/Home.vue");

/** 引入登录页面Login */
const LoginIndex = () => import("../pages/home/LoginIndex.vue");

/** 引入注册页面Register */
const RegisterIndex = () => import("../pages/home/RegisterIndex.vue");

/** 引入人员管理页面Human */
const Human = ()=> import("../pages/human/Human.vue");

/** 引入需求管理页面DemandIndex */
const DemandIndex = () => import("../pages/demand/DemandIndex.vue");

/** 引入需求列表页面DemandList */
const DemandList = () => import("../pages/demand/DemandList.vue");

/** 引入预算管理页面BudgetIndex */
const BudgetIndex = () => import("../pages/budget/BudgetIndex.vue");

/** 引入预算列表页面BudgetList */
const BudgetList = () => import("../pages/budget/BudgetList.vue");

/** 把组件注册到 路由中去 */
const router = new Router({
    routes: [
        {path: '', redirect: '/login'},
        {path: '/login', component: LoginIndex, meta: {layout: "blank-layout"}},
        {path: '/register', component: RegisterIndex, meta: {layout: 'blank-layout'}},
        {path: '/home', component: HomeIndex, meta: {layout: 'main-layout', requireLogin: true}},
        {path: '/human', component: Human, meta: {layout: 'main-layout', requireLogin: true}},
        {path: '/demand', component: DemandIndex, children: [
            {path: '', redirect: 'list'},
            {path: 'list', component: DemandList, meta: {requireLogin: true}},
            {path: 'company/approve', component: DemandList, meta: {requireLogin: true}},
            {path: 'dept/approve', component: DemandList, meta: {requireLogin: true}},
        ]},
        {path: '/budget', component: BudgetIndex, children: [
            {path: '', redirect: 'apply'},
            {path: 'apply', component: BudgetList, meta: {requireLogin: true}},
            {path: 'approve', component: BudgetList, meta: {requireLogin: true}},
        ]}
    ]
});

/** 在路由切换之前的钩子函数：beforeEach */
router.beforeEach((to, from, next) => {
    /** 对权限业务进行处理 */
    if (to.meta.requireLogin) {
        let cache = sessionStorage.getItem('user_info');
        if (cache && cache.indexOf('token') > -1) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;