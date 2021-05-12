/****************************************************************
 * created by Celsius on 2020-08-11 for main entry file
 ****************************************************************/

 <template>
    <div class="register-contianer">
        <div class="register-box">
            <span class="title">MIS SYSTEM</span>
            <el-form :model="userData"
                size="small"
                status-icon 
                :rules="rules"
                ref="userForm" 
                label-width="100px">
                <el-form-item label="用户编码" prop="userId">
                    <el-input type="text" v-model="userData.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="userName">
                    <el-input type="text" v-model="userData.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userPwd">
                    <el-input type="password" v-model="userData.userPwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPwd">
                    <el-input type="password" v-model="userData.confirmPwd"></el-input>
                </el-form-item>
                <el-form-item label="入职日期" required >
                    <el-form-item prop="userEntry">
                        <el-date-picker type="date" placeholder="选择日期" v-model="userData.userEntry" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm" type="primary">提交</el-button>
                    <el-button @click="resetForm" type="warning">重置</el-button>
                    <el-button @click="toLogin" type="success">去登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Ajax from "@/util/Ajax";
    export default {
        data() {
            let _this = this;
            /** 校验用户确认密码是否正确 */
            var validatePwd = function(rule, value, callback) {
                if (value === _this.userData.userPwd) {
                    callback();
                } else {
                    callback('密码不匹配');
                }
            }
            return {
                userData: {
                    userId: '',
                    userName: '',
                    userPwd: '',
                    confirmPwd: '',
                    userEntry: Date.now()
                },
                rules: {
                    userId: [
                        {required: true, message: '请输入用户编码', trigger: 'input'},
                        {min: 5, message: '用户编码不能少于5个字符', trigger: 'blur'}
                    ],
                    userName: [{required: true, message: '请输入用户名称', trigger: 'input'}],
                    userPwd: [{required: true, message: '请输入用户密码', trigger: 'input'}],
                    confirmPwd: [
                        {required: true, message: '请输入确认密码', trigger: 'blur'},
                        {validator: validatePwd, trigger: 'blur'}
                    ],
                    userEntry:[{required:true,message:'请输入入职日期',trigger:'blur'}]
                }
            }
        },
        methods: {
            /** 重置表单 */
            resetForm() {
                this.$refs.userForm.resetFields();
            },
            /** 提交表单 */
            submitForm() {
                this.$refs.userForm.validate(async flag => {
                    if (flag) {
                        let result = await Ajax({url: '/user/add',
                            data: {
                                userId: this.userData.userId,
                                userName: this.userData.userName,
                                userPwd: this.userData.userPwd,
                                userEntry: this.userEntry
                            }, method: 'post'
                        });
                        if (result.code === 200) {
                            this.$message.success('注册成功，请重新登录');
                            this.$router.push('/login');
                        } else {
                            this.$message.error('注册失败，原因：' + result.message);
                        }
                    } else {
                        console.log('校验失败');
                    }
                });
            },
            /** 跳转登录 */
            toLogin(){
                this.$router.push('/login');
            }
        }
    }
</script>

<style lang="less">
    .el-form-item__label{
        color: #fff;
    }
</style>

<style lang="less" scoped> 
    @import "@/styles/common.less";
    @import "@/styles/home/register.less";
</style>