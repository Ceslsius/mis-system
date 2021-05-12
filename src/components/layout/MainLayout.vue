/****************************************************************
 * created by Celsius on 2020-08-11 for main layout file
 ****************************************************************/

<template>
    <div class="main-layout">
        <!-- 导航 -->
        <nav>
            <div class="brand">
                <span class="logo">MIS SYSTEM</span>
                <span class="bread">{{ routePath }}</span>
                <i @click="logoutEvt" class="close"></i>
                <span :class="['user', userInfo.userSex === '女' ? 'girl' : '']">{{ userInfo.userName }}</span>
                <i class="info"></i>
            </div>
        </nav>
        <aside>
            <!-- 菜单 -->
            <el-menu
                :default-active="defaultIndex"
                class="el-menu-vertical-demo"
                background-color="#233644"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu v-for="menu in menuList" :index="menu.id" :key="menu.id">
                    <template slot="title">
                        <i class="menu.icon"></i>
                        <span>{{ menu.name }}</span>
                    </template>
                    <el-menu-item @click="menuClick" v-for="menuChildren in menu.children" :index="menuChildren.id" :key="menuChildren.id">{{ menuChildren.name }}</el-menu-item>
                </el-submenu>
            </el-menu>
        </aside>
        <article>
            <!-- 主要区域 -->
            <router-view></router-view>
        </article>
    </div>
</template>

<script>
    import Ajax from "@/util/Ajax";
    export default {
        data() {
            return {
                userInfo: {},
                menuList: [],
                defaultIndex: 'index01',
                routePath: ''
            }
        },
        watch: {
        '$route.path': function() {
                this.resetMenuActIdx();
            }
        },
        created() {
            let cache = sessionStorage.getItem('user_info');
            try {
                this.userInfo = JSON.parse(cache);
            } catch(e) {
                this.$message.error('非法操作');
                sessionStorage.removeItem('user_info');
                this.$router.push('/login');
                throw new Error('用户非法操作，进入页面');
            }
            /** 获取菜单数据 */
            this.getMenuData();
        },
        methods: {
            /** 退出系统方法 */
            logoutEvt() {
                sessionStorage.removeItem('user_info');
                this.$router.push('/login');
            },
            /** 获取菜单数据 */
            async getMenuData() {
                let load = this.$loading();
                let result = await Ajax({url: '/basedata/menu'});
                load.close();
                if (result.code === 200) {
                    this.menuList = result.data || [];
                    this.resetMenuActIdx();
                } else {
                    this.$message.warning('获取菜单数据失败，请重试！');
                }
            },
            /** 菜单选择 */
            menuClick(menu) {
                this.menuList.some((it) => {
                    it.children.some((cit) => {
                        if(cit.id === menu.index){
                            if(cit.path != this.$route.path){
                                this.$router.push(cit.path)
                            }
                        }
                    })
                });
            },
            /** 刷新页面打开已选择侧边栏 */
            resetMenuActIdx() {
                this.menuList.some((it) => {
                    it.children.some((cit) => {
                        if(cit.path === this.$route.path){
                            this.defaultIndex = cit.id
                            this.routePath = it.name + ' > ' + cit.name;
                        }
                    })
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "@/styles/common";
    @import "@/styles/layout/index";
</style>