/****************************************************************
 * created by Celsius on 2020-08-11 for Human entry file
 ****************************************************************/

<template>
   <page-layout title="人员管理">
       <!-- header -->
        <el-row slot="header" :gutter="16">
            <el-col :offset="8" :span="6">
                <el-input type="text" size="small" v-model="userName" @keyup.native="insertEnter" placeholder="请输入用户姓名进行查询"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="success" size="small" @click="addEvt">新增</el-button>
            </el-col>
        </el-row>
        <!-- article -->
        <el-table :data="humanList" style="width: 100%" height= "100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户ID :">
                            <span>{{ props.row.userId }}</span>
                        </el-form-item>
                        <el-form-item label="用户姓名 :">
                            <span>{{ props.row.userName }}</span>
                        </el-form-item>
                        <el-form-item label="用户部门 :">
                            <span>{{ props.row.userDept }}</span>
                        </el-form-item>
                        <el-form-item label="入职日期 :">
                            <span>{{ props.row.userEntry | dataGl }}</span>
                        </el-form-item>
                        <el-form-item label="用户性别 :">
                            <span>{{ props.row.userSex }}</span>
                        </el-form-item>
                        <el-form-item label="用户年龄 :">
                            <span>{{ props.row.userAge }}</span>
                        </el-form-item>
                        <el-form-item label="用户地址 :">
                            <span>{{ props.row.userAddress }}</span>
                        </el-form-item>
                        <el-form-item label="用户邮箱 :">
                            <span>{{ props.row.userEmail }}</span>
                        </el-form-item>
                        <el-form-item label="用户备注 :">
                            <span>{{ props.row.userRemark }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="用户ID" prop="userId"></el-table-column>
            <el-table-column label="用户姓名" prop="userName"></el-table-column>
            <el-table-column label="用户部门" prop="userDept"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button-group>
                        <el-button type="primary" size="small" @click="editEvt(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="delEvt(scope.row)">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <!-- 新增及编辑用户的对话框 -->
        <el-dialog :title="isEdit ? '用户编辑' : '用户新增'" 
        :visible.sync="dialogFormVisible"
        custom-class="test-dalog"
        :append-to-body="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        width="800px">
            <el-form :model="userInfo"
            ref="formNode"
            size="small"
            :rules="rules"
            label-width="80px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="用户编号" prop="userId">
                        <el-input :readonly="isEdit" v-model="userInfo.userId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户姓名" prop="userName">
                        <el-input v-model="userInfo.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户密码" prop="userPwd">
                        <el-input v-model="userInfo.userPwd"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="入职时间" prop="userEntry">
                        <el-date-picker v-model="userInfo.userEntry"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期时间"
                            style="width: 173.33px"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户部门" prop="userDept">
                        <el-select v-model="userInfo.userDept" placeholder="">
                            <el-option v-for="item in deptCache" :label="item" :value="item" :key="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户性别" prop="userSex">
                        <el-select v-model="userInfo.userSex" placeholder="">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户年龄" prop="userAge">
                        <el-input v-model.number="userInfo.userAge" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="用户地址" prop="userAddress">
                        <el-input v-model="userInfo.userAddress" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户生日" prop="userDate">
                        <el-date-picker v-model="userInfo.userDate"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期时间"
                            style="width: 173.33px"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户手机" prop="userPhone">
                        <el-input v-model="userInfo.userPhone" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户邮箱" prop="userEmail">
                        <el-input v-model="userInfo.userEmail" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="用户备注" prop="userRemark">
                        <el-input type="textarea" :rows="4" resize="none" v-model="userInfo.userRemark" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;userInfo={}">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false;subEvt()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- footer -->
        <el-pagination slot="footer" @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal">
        </el-pagination>
   </page-layout>
</template>

<script>
    import Ajax from '@/util/Ajax';
    import BaseView from '@/pages/common/BaseView';
    import PageLayout from "../common/PageLayout";
    export default {
        mixins:[BaseView],
        components: {PageLayout},
        data() {
            return {
                userName: '',
                userInfo: {
                    userId: '',
                    userName: '',
                    userPwd: '',
                    userEntry: '',
                    userDept: '',
                    userSex: '',
                    userAge: '',
                    userAddress: '',
                    userDate: '',
                    userPhone: '',
                    userEmail: '',
                    userRemark: ''
                },
                rules: { // 用户数据校验规则
                    userId: [{required: true, message: '用户编号必填', trigger: 'blur'}],
                    userName: [{required: true, message: '用户姓名必填', trigger: 'blur'}],
                    userPwd: [{required: true, message: '用户密码必填', trigger: 'blur'}],
                    userEntry: [{required: true, message: '用户生日必填', trigger: 'blur'}],
                    userDept: [{required: true, message: '用户部门必填', trigger: 'blur'}],
                    userSex: [{required: true, message: '用户性别必填', trigger: 'blur'}],
                    userAge: [
                        {required: true, message: '用户年龄必填', trigger: 'blur'},
                        {type: 'number', message: '请输入数字', trigger: 'blur'}
                    ],
                    userAddress: [{required: true, message: '用户地址必填', trigger: 'blur'}],
                    userDate: [{required: true, message: '用户生日必填', trigger: 'blur'}],
                    userPhone: [{required: true, message: '用户电话必填', trigger: 'blur'}],
                    userEmail: [{required: true, message: '用户邮箱必填', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}],
                    userRemark: [{required: true, message: '用户备注必填', trigger: 'blur'}]
                },
                humanList: [],
                dialogFormVisible: false, // 对话框是否显示
                isEdit: false, // 是否为编辑事件
                deptCache: [], // 向后端请求的所有部门数据
                formLabelWidth: '120px'
            };
        },

        created() {
            /** 获取用户列表 */
            this.getDataList();
            /** 获取部门数据 */
            this.getDept();
        },

        filters: {
            dataGl(data){
                if(data){
                    return data.slice(0,10);
                } else {
                    return data;
                }
            }
        },

        methods: {
            /** 请求用户数据 */
            async getDataList(){
                let result = await Ajax({
                    url: '/user/list',
                    params: {
                        userName: this.userName,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                    }
                })
                if(result.code === 200){
                    this.humanList = result.data.rows;
                    this.pageTotal = result.data.total;
                }
            },
            /** 查询输入框的keyup事件 */
            insertEnter() {
                this.pageNum = 1;
                this.pageSize = 10;
                this.getDataList();
            },
            /** 删除用户事件 */
            async delEvt(row) {
                let userInfo = JSON.parse(sessionStorage.getItem('user_info'));
                let load = this.$loading();
                if(userInfo.userId != 'admin'){
                    this.$message.warning('权限不足！')
                } else {
                    this.$confirm(`确认要删除【${row.userName}】用户信息吗？`, '删除确认', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(async () => {
                        let result = await Ajax({
                            url: `/user/delete/${row.userId}`,
                            method: 'POST'
                        })
                        if(result.code === 200){
                            this.$message.success('删除成功');
                            this.getDataList();
                        }else{
                            this.$message.error(`删除失败，原因：${result.message}`);
                        }
                    })
                    .catch(() => {})
                }
                load.close();
            },
            /** 新增按钮点击事件 */
            addEvt() {
                this.isEdit = false;
                this.dialogFormVisible = true;
            },
            /** 编辑按钮点击事件 */
            editEvt(row) {
                let userInfo = JSON.parse(sessionStorage.getItem('user_info'));
                let load = this.$loading();
                if(userInfo.userId != 'admin'){
                    this.$message.warning('权限不足！')
                } else {
                    this.userInfo = row;
                    this.isEdit = true;
                    this.dialogFormVisible = true;
                }
                load.close();
            },
            /** 新增及编辑用户信息提交 */
            async subEvt() {
                let load = this.$loading();
                let result = await Ajax({
                    url: this.isEdit ? '/user/update' : '/user/add',
                    method: 'POST',
                    data: this.userInfo
                })
                load.close();
                if(result.code === 200){
                    this.$message.success(`用户${this.isEdit ? '编辑' : '新增'}成功`);
                } else {
                    this.$message.warning(`用户${this.isEdit ? '编辑' : '新增'}失败, 原因：${result.message}`);
                }
                this.getDataList();
                this.userInfo = {};
            },
            /** 获取部门数据 */
            async getDept() {
                console.log(this.demandList)
                let load = this.$loading();
                let result = await Ajax({
                    url: '/basedata/dept'
                });
                load.close();
                if(result.code === 200){
                    this.deptCache = result.data;
                } else {
                    this.$message.warning('获取部门数据失败');
                }
            }
        },
    }
</script>

<style lang="less" scoped>
        .demo-table-expand {
            font-size: 0;
        }
        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }
        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 30%;
        }
</style>