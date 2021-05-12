/****************************************************************
 * created by Celsius on 2020-08-11 for BaseModal entry file
 ****************************************************************/

/** 第一步 */
<template>
    <div v-show="show" ref="modalNode" class="modal-container">
        <!-- 第四步 -->
        <div class="layer"></div>
        <div class="modal-box" :style="{width: `${width}px`}">
            <header v-if="showHeader">
                <div v-if="!hasHeaderSlot" class="title">
                    <span>{{ title }}</span>
                    <i @click="closeModal" class="close-icon"></i>
                </div>
                <slot name="header"></slot>
            </header>
            <article>
                <slot></slot>
            </article>
            <footer v-if="showFooter">
                <div v-show="!hasFooterSlot" class="btns-box">
                    <span @click="btnEvt('cancel')">{{ cancelText }}</span>
                    <span @click="btnEvt('confirm')" class="primary">确认</span>
                </div>
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

/** 第三步 */
<script>
    export default {
        name: 'test',
        /** 第五步 */
        props: {
            title: {
                type: String,
                default: ''
            },
            showClose: {
                type: Boolean,
                default: true
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            confirmText: {
                type: String,
                default: '确认'
            },
            show: {
                type: Boolean,
                default: false
            },
            width: {
                type: Number,
                default: 480
            },
            fixBody: {
                type: Boolean,
                default: false
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            showFooter: {
                type: Boolean,
                default: true
            }
        },
        /** 计算属性 */
        computed: {
            hasHeaderSlot: function() {
                return this.$slots.header;
            },
            hasFooterSlot: function() {
                return this.$slots.footer;
            }
        },
        /** 第六步 */
        methods: {
            closeModal() {
                // this.show = false;
                this.$emit('update:show', false);
            },
            btnEvt(type) {
                // type 为：cancel/confirm  cancelEvent/confirmEvent
                this.$emit(`${type}Event`, type);
                this.closeModal();
            }
        },
        mounted() {
            if (this.fixBody) document.body.appendChild(this.$refs.modalNode);
        }
    }
</script>

/** 第二步 */
<style lang="less" scoped>
    @import "../../styles/common.less";

    .modal-container {
        .abs-cls();
        width: 100%;
        height: 100%;
        >.layer {
            .abs-cls();
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .6);
        }
    }

    .modal-box {
        .rel-cls();
        margin: 10vh auto 20px;
        height: auto;
        background: #fff;
        box-shadow: 0 0 10px #9c9c9c;
        >footer,
        >header {
            display: block;
            position: relative;
            height: 43px;
            border-bottom: solid 1px #ddd;
            >.btns-box,
            >.title {
                display: block;
                position: relative;
                height: 42px;
            }
        }
        >header {
            >.title {
                >span {
                    display: block;
                    position: relative;
                    height: 42px;
                    padding: 5px 16px;
                    font-size: .8rem;
                    color: @c1e;
                    line-height: 32px;
                }
                >.close-icon {
                    display: block;
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 42px;
                    width: 42px;
                    background: url(../../images/close-icon.png) center center / 16px 16px no-repeat;
                    .touch();
                }
            }
        }
        >article {
            padding: 16px;
        }
        >footer {
            border-top: solid 1px #ddd;
            border-bottom: none;
            >.btns-box {
                padding: 0 8px;
                text-align: center;
                >span {
                    display: inline-block;
                    height: 32px;
                    margin: 5px 8px;
                    padding: 0 15px;
                    border: solid 1px #ddd;
                    font-size: .7rem;
                    color: @c1e;
                    text-align: center;
                    line-height: 30px;
                    .touch();
                    &.primary {
                        border-color: #0012af;
                        color: #fff;
                        background: #0012af;
                    }
                }
            }
        }
    }
</style>