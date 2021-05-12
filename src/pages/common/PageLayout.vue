/****************************************************************
 * created by Celsius on 2020-08-11 for PageLayout entry file
 ****************************************************************/

<template>
    <div class="list-layout">
        <header>
            <el-row :gutter="16">
                <el-col :span="6">
                    <span>{{ title }}</span>
                </el-col>
                <slot name="header"></slot>
            </el-row>
        </header>
        <article>
            <slot></slot>
        </article>
        <footer style="text-align: right;">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="less" scoped>
    .list-layout{
        display: block;
        position: relative;
        background-color: #fff;
        height: 100%;
        >header,
        >article,
        >footer{
            display: block;
            position: relative;
            padding: 8px 16px;
        }
        >header{
            height: 50px;
        }
        >article{
            height: 634px;
        }
        >footer{
            margin: 16px;
            height: 50px;
        }
    }
</style>