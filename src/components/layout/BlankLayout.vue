/****************************************************************
 * created by Celsius on 2020-08-11 for blank layout file
 ****************************************************************/

<template>
    <div class="blank-layout">
        <!-- <slot></slot> -->
        <router-view></router-view>
    </div>
</template>

/** 导出class 对象 */
<script>
    export default {
        created() {
        }
    }
</script>

<style lang="less" scoped>
    .blank-layout {
        background: url(../../images/loginBac.jpg) no-repeat;
        background-size: 100% 100%;
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>