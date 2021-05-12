/****************************************************************
 * created by Celsius on 2020-08-11 for main entry file
 ****************************************************************/

<template>
    <div class="application-contianer">
        <component :is="layout">
            <!-- 一级路由 -->
        </component>
    </div>
</template>

/** 导出class 对象 */
<script>
    export default {
        props: {
            layout: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                layoutName: ''
            }
        },
        created() {
            
        },
        mounted() {
            
        },
        methods: {
            
        }
    }
</script>

<style lang="less" scoped>
    .application-contianer {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>