/****************************************************************
 * created by Celsius on 2020-08-11 for main entry file
 ****************************************************************/

<template>
    <div class="login-contianer">
        <div class="login-box">
            <span class="title">MIS SYSTEM</span>
            <el-input v-model="userId" @keyup.native="userIdEnter" placeholder="请输入用户名" class="userInput" clearable></el-input>
            <el-input v-model="userPwd" ref="pwdInput" show-password @keyup.native="userPwdEnter" :type="pwdView" placeholder="请输入用户密码" class="userInput"></el-input>
            <div class="remember">
                <el-checkbox v-model="rememberPassword" style="color: #fff;">记住密码</el-checkbox>
            </div>
            <el-button type="primary" @click="loginEvt" round class="loginBtn">登录</el-button>
            <div class="remember reg">
                <span @click="regEvt">注册账号</span>
                <span>忘记密码?</span>
            </div>
        </div>
    </div>
</template>

/** 导出class 对象 */
<script>
    /** 导入加密库 crypto-js */
    import CryptoJS from "crypto-js";

    /** 导入Ajax 方法 */
    import Ajax from "@/util/Ajax";

    export default {
        data() {
            return {
                userId: '',
                userPwd: '',
                key: 'hasaki',
                rememberPassword: false,
                pwdView: 'password'
            }
        },
        created() {
            let cacheId = localStorage.getItem('keyId')
            if (cacheId) {
                cacheId = CryptoJS.AES.decrypt(cacheId, this.key).toString(CryptoJS.enc.Utf8);
                try {
                    cacheId = JSON.parse(cacheId);
                    this.userId = cacheId.userId;
                } catch(e) {
                    throw new Error(e);
                }
            }
            let cache = localStorage.getItem('keyPwd');
            if (cache) {
                cache = CryptoJS.AES.decrypt(cache, this.key).toString(CryptoJS.enc.Utf8);
                try {
                    cache = JSON.parse(cache);
                    this.rememberPassword = true;
                    this.userPwd = cache.userPwd;
                } catch(e) {
                    throw new Error(e);
                }
            }
        },
        methods: {
            async loginEvt() {
                let obj = {
                    userId: this.userId,
                    userPwd: CryptoJS.MD5(this.userPwd).toString().toLocaleUpperCase()
                };
                let result = await Ajax({
                    url: '/user/login',
                    data: obj,
                    method: 'POST'
                });
                if (result.code === 200) {
                    if (this.rememberPassword) {
                        let strId = JSON.stringify({userId: this.userId});
                        let keyId = CryptoJS.AES.encrypt(strId, this.key).toString();
                        localStorage.setItem('keyId', keyId);
                        let str = JSON.stringify({userPwd: this.userPwd});
                        let key = CryptoJS.AES.encrypt(str, this.key).toString();
                        localStorage.setItem('keyPwd', key);
                    } else {
                        localStorage.removeItem('keyPwd');
                    }
                    sessionStorage.setItem('user_info', JSON.stringify(result.data));
                    this.$store.dispatch('common/setUserInfo', result.data);
                    this.$message.success('登录成功');
                    this.$router.push('/home');
                } else {
                    this.$message.error(`登录失败，原因：${result.message}`);
                }
            },
            userIdEnter(){
                if(arguments[0].keyCode === 13){
                    this.$refs.pwdInput.focus();
                }
            },
            userPwdEnter(){
                if(arguments[0].keyCode === 13){
                    this.loginEvt();
                }
            },
            regEvt(){
                this.$router.push('./register');
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "@/styles/common.less";
    @import "@/styles/home/login.less";
</style>