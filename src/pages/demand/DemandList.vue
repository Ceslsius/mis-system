/****************************************************************
 * created by Celsius on 2020-08-11 for DemandList entry file
 ****************************************************************/

<template>
   <page-layout :title="title">
       <!-- header -->
        <el-row slot="header" :gutter="16">
            <el-col :offset="8" :span="6">
                <el-input type="text" size="small" v-model="demandName" @keyup.native="insertDemand" placeholder="请输入项目名称进行查询"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="success" size="small" @click="addEvt">新增</el-button>
            </el-col>
        </el-row>
        <!-- article -->
        <el-table :data="tableData" style="width: 100%" height= "100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="项目流水号 :">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="项目名称 :">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="项目状态 :">
                            <span>{{ props.row.state }}</span>
                        </el-form-item>
                        <el-form-item label="投资金额(万) :">
                            <span>{{ props.row.amount}}</span>
                        </el-form-item>
                        <el-form-item label="投资方式 :">
                            <span>{{ props.row.type }}</span>
                        </el-form-item>
                        <el-form-item label="项目级别 :">
                            <span>{{ props.row.level }}</span>
                        </el-form-item>
                        <el-form-item label="工期(月) :">
                            <span>{{ props.row.schedule }}</span>
                        </el-form-item>
                        <el-form-item label="提报时间 :">
                            <span>{{ props.row.time | timeGl}}</span>
                        </el-form-item>
                        <el-form-item label="提报人员 :">
                            <span>{{ props.row.handler }}</span>
                        </el-form-item>
                        <el-form-item label="提报部门 :">
                            <span>{{ props.row.unit }}</span>
                        </el-form-item>
                    </el-form>
                    <el-timeline style="marginTop: 10px">
                        <el-timeline-item v-for="TL in props.row.approveInfo" :timestamp="TL.time" placement="top" :key="TL.id">
                            <el-card>
                                <h4>{{ TL.remark }}</h4>
                                <p>{{ TL.dept }}{{ TL.human }}提交</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </template>
            </el-table-column>
            <el-table-column label="项目流水号" prop="id"></el-table-column>
            <el-table-column label="项目名称" prop="name"></el-table-column>
            <el-table-column label="项目状态" prop="state"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button-group>
                        <el-button v-show="scope.row.state === '总部初审'" @click="rowEvt('edit', scope.row)" type="warning" size="small">编辑</el-button>
                        <el-button v-show="listShow" @click="rowEvt('approve', scope.row)" type="primary" size="small">审批</el-button>
                        <el-button @click="rowEvt('delete', scope.row)" type="danger" size="small">删除</el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <!-- 对话框 -->
        <el-dialog :title="isCreate ? '需求新增' : isEdit ? '需求编辑' : '需求审批'" 
        :visible.sync="dialogFormVisible"
        custom-class="test-dalog"
        :append-to-body="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        width="800px">
            <el-form :model="demandInfo"
            ref="formNode"
            size="small"
            :rules="rules"
            label-width="80px">
            <el-steps :space="200" :active="demandInfo.approveInfo ? demandInfo.approveInfo.length + 1 : 0" finish-status="success" :alignCenter= true style="marginBottom: 20px">
                <el-step title="需求提交"></el-step>
                <el-step title="总部初审"></el-step>
                <el-step title="科室评审"></el-step>
                <el-step title="科室审批"></el-step>
                <el-step title="总部审批"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="流水号" prop="id">
                        <el-input readonly v-model="demandInfo.id" placeholder="系统自动生成"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="需求名字" prop="name">
                        <el-input :readonly="!isCreate && !isEdit" v-model="demandInfo.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="投资金额" prop="amount">
                        <el-input :readonly="!isCreate && !isEdit" v-model.number="demandInfo.amount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="投资方式" prop="type">
                        <el-select :disabled="!isCreate && !isEdit" v-model="demandInfo.type" placeholder="">
                            <el-option v-for="it in commonCache.invest" :label="it" :value="it" :key="it"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="项目级别" prop="level">
                        <el-select :disabled="!isCreate && !isEdit" v-model="demandInfo.level" placeholder="">
                            <el-option v-for="it in commonCache.level" :label="it" :value="it" :key="it"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="工期(月)" prop="schedule">
                        <el-input :readonly="!isCreate && !isEdit" v-model="demandInfo.schedule" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="提报单位" prop="unit">
                        <el-select :disabled="!isCreate && !isEdit" v-model="demandInfo.unit" placeholder="">
                            <el-option v-for="item in deptCache" :label="item" :value="item" :key="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="提报人员" prop="handler">
                        <el-input readonly v-model="demandInfo.handler" placeholder="" style="width: 141px;"></el-input>
                        <el-button :disabled="!isCreate && !isEdit" :value="demandInfo.handler" @click="drawer = true" style="width: 30px;height:30px;padding:0;fontSize:16px" icon="el-icon-user-solid"></el-button>
                    </el-form-item>
                    <el-drawer
                    title="人员选择"
                    :visible.sync="drawer"
                    :modal="false"
                    :before-close="handleClose">
                    <el-checkbox-group v-model="userCheckList" style="marginLeft: 16px">
                        <el-checkbox v-for="user in userList" :label="user.userId" :key="user.userId">{{ user.userName }}</el-checkbox>
                    </el-checkbox-group>
                    </el-drawer>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系人" prop="contact">
                        <el-input :readonly="!isCreate && !isEdit" v-model="demandInfo.contact"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系方式" prop="phone">
                        <el-input :readonly="!isCreate && !isEdit" v-model="demandInfo.phone" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="提报时间" prop="time">
                        <el-date-picker v-model="demandInfo.time"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期时间"
                            style="width: 173.33px"
                            :disabled="!isCreate && !isEdit"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="附件" prop="fileName">
                        <el-upload
                        class="upload-demo"
                        :disabled="!isCreate && !isEdit"
                        :limit= 1 
                        action="/apis/file/upload"
                        :on-change="handleChange"
                        name="fileName"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip"></div>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="项目情况" prop="remark">
                        <el-input :readonly="!isCreate && !isEdit" type="textarea" :rows="4" resize="none" v-model="demandInfo.remark" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="!isCreate && !isEdit">
                    <el-form-item label="审批意见" prop="Remark">
                        <el-input type="textarea" :rows="4" resize="none" v-model="demandData.remark" placeholder="请输入审批意见"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" v-if="!isCreate && !isEdit">
                    <el-form-item label="审批人员" prop="Handler">
                        <el-input readonly v-model="demandData.handler" placeholder="请选择审批人员" style="width: 141px;"></el-input>
                        <el-button :value="demandData.handler" @click="drawer_2 = true" style="width: 30px;height:30px;padding:0;fontSize:16px" icon="el-icon-user-solid"></el-button>
                    </el-form-item>
                    <el-drawer
                    title="人员选择"
                    :visible.sync="drawer_2"
                    :modal="false"
                    :before-close="handleClose_2">
                    <el-checkbox-group v-model="handlerCheckList" style="marginLeft: 16px">
                        <el-checkbox v-for="user in userList" :label="user.userId" :key="user.userId">{{ user.userName }}</el-checkbox>
                    </el-checkbox-group>
                    </el-drawer>
                </el-col>
            </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;demandInfo={};fileList = [];">取 消</el-button>
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
        filters: {
            timeGl(time){
                return(time.slice(0,10) + ' ' + time.slice(11,16));
            },
        },
        computed:{
            title(){
                let title = ''
                if(this.$route.path === '/demand/list'){
                    title = '需求列表'
                }else if(this.$route.path === '/demand/company/approve'){
                    title = '总部审批'
                }else if(this.$route.path === '/demand/dept/approve'){
                    title = '科室审批'
                }
                return title;
            },
        },
        data() {
            return {
                demandName: '',
                listShow: true,
                dialogFormVisible: false, // 对话框是否显示
                isCreate: false, // 是否是新增事件 
                isEdit: false, // 是否是编辑事件
                userList: [], // 用户列表
                deptCache: [], // 向后端请求的所有部门数据
                commonCache: [], // 向后端请求的所有页面下拉数据
                formLabelWidth: '120px',
                demandInfo: {
                    name: '',
                    amount: '',
                    type: '',
                    level: '',
                    unit: '',
                    contact: '',
                    phone: '',
                    time: '',
                    fileName: '',
                    remark: '',
                    handler: ''
                },
                demandData:{
                    state: '',
                    id: '',
                    handler: '',
                    dept: '',
                    human: '',
                    time: '',
                    remark: ''
                },
                rules: { // 需求数据校验规则
                    name: [{required: true, message: '需求名字必填', trigger: 'blur'}],
                    amount: [
                        {required: true, message: '投资金额必填', trigger: 'blur'},
                        {type: 'number', message: '请输入数字', trigger: 'blur'}
                    ],
                    type: [{required: true, message: '请选择投资方式', trigger: 'blur'}],
                    level: [{required: true, message: '请选择项目级别', trigger: 'blur'}],
                    schedule: [{required: true, message: '需求工期必填', trigger: 'blur'}],
                    unit: [{required: true, message: '请选择提报单位', trigger: 'blur'}],
                    contact: [{required: true, message: '请选择联系人', trigger: 'blur'}],
                    phone: [{required: true, message: '请输入联系方式', trigger: 'blur'}],
                    time: [{required: true, message: '请选择提报时间', trigger: 'blur'}],
                    remark: [{required: true, message: '请输入项目情况', trigger: 'blur'}],
                    handler: [{required: true, message: '请选择提报人员', trigger: 'blur'},],
                    Remark: [{required: true, message: '请输入审批意见', trigger: 'blur'},],
                    Handler: [{required: true, message: '请选择审批人员', trigger: 'blur'},],
                },
                drawer: false,
                drawer_2: false,
                userCheckList: [],
                handlerCheckList: [],
                fileList: []
            };
        },

        created() {
            /** 获取需求列表 */
            this.getDataList();
            /** 获取用户列表 */
            this.getUserList();
            /** 获取数据 */
            this.getCache();
            if(this.$route.path === '/demand/list') this.listShow = false;
        },

        methods: {
            /** 获取需求列表 */
            async getDataList() {
                let userInfo = JSON.parse(sessionStorage.getItem('user_info'));
                let path = this.$route.path;
                let load = this.$loading();
                if(userInfo.userId != 'admin' && path === '/demand/list'){
                    this.$message.warning('权限不足！')
                } else {
                    let result = await Ajax({url: '/demand/list',
                        params: {
                            name: this.demandName,
                            pageNum: this.pageNum,
                            dept: path === '/demand/company/approve' ? '总部' 
                                : path === '/demand/dept/approve' ? '科室' : null,
                            pageSize: this.pageSize}});
                    if (result.code === 200) {
                        this.tableData = result.data.rows;
                        this.pageTotal = result.data.total;
                    } else {
                        this.$message.warning('获取需求列表失败');
                    }
                }
                load.close();
            },
            /** 获取用户数据 */
            async getUserList() {
                let load = this.$loading();
                let result = await Ajax({
                    url: '/user/list',
                    params: {
                        pageSize: 100
                    }
                })
                load.close();
                if(result.code === 200){
                    this.userList = result.data.rows;
                } else {
                    this.$message.warning('获取用户数据失败');
                }
            },
            /** 获取数据 */
            async getCache() {
                let load = this.$loading();
                let result_dept = await Ajax({
                    url: '/basedata/dept'
                });
                let result_common = await Ajax({
                    url: '/basedata/common'
                })
                load.close();
                if(result_common.code === 200){
                    this.commonCache = result_common.data;
                } else {
                    this.$message.warning('获取页面下拉数据失败');
                }
                if(result_dept.code === 200){
                    this.deptCache = result_dept.data;
                } else {
                    this.$message.warning('获取部门数据失败');
                }
            },
            /** 需求操作方法 */
            async rowEvt(type, row) {
                let userInfo = JSON.parse(sessionStorage.getItem('user_info'));
                let load = this.$loading();
                this.fileList = [{
                    name: row.fileName,
                    url: row.fileName
                }]
                if(type === 'delete'){
                    if( userInfo.userId === 'admin' ){
                        this.$confirm(`确认要删除【${row.name}】项目需求吗？`, '删除确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        })
                        .then(async () => {
                            let result = await Ajax({
                                url: `/demand/delete/${row.id}`,
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
                    } else {
                        this.$message.warning('没有删除权限，请联系管理员')
                        load.close();
                    }
                } else {
                    if(type === 'edit'){
                        if(userInfo.userId != 'admin'){
                            this.$message.warning('没有编辑权限，请联系管理员')
                            load.close();
                            return;
                        }
                        this.isEdit = true;
                    } else {
                        if(row.handler.split('&&').some(it => it === userInfo.userId) === false){
                                this.$message.warning('没有审批权限！')
                                load.close();
                                return;
                        }
                    }
                    let result = await Ajax({
                        url: `/demand/${row.id}`,
                    })
                    if(result.code === 200){
                        this.demandInfo = result.data
                        this.isCreate = false;
                        this.dialogFormVisible = true;
                        this.demandInfo = row;
                    }else{
                        this.$message.error(`加载需求详细信息失败，原因：${result.message}`);
                    }
                }
                load.close();
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(() => {
                    this.demandInfo.handler = this.userCheckList.join('&&');
                    done();
                })
                .catch(() => {});
            },
            handleClose_2(done) {
                this.$confirm('确认关闭？')
                .then(() => {
                    this.demandData.handler = this.handlerCheckList.join('&&');
                    done();
                })
                .catch(() => {});
            },
            /** 需求新增方法 */
            addEvt() {
                this.isCreate = true;
                this.dialogFormVisible = true;
            },
            /** 需求搜索方法 */
            insertDemand() {
                this.pageNum = 1;
                this.pageSize = 10;
                this.getDataList();
            },
            /** 文件上传方法 */
            handleChange(file, fileList) {
                this.demandInfo.fileNmae = file.name;
                this.fileList = fileList.slice(-3);
            },
            /** 对话框确定事件 */
            async subEvt() {
                let load = this.$loading();
                if( this.isEdit ){
                    let result = await Ajax({
                        url: '/demand/update',
                        method: 'POST',
                        data: this.demandInfo
                    });
                    load.close();
                    if(result.code === 200){
                        this.$message.success('需求编辑成功');
                    } else {
                        this.$message.warning(`需求编辑失败，原因：${result.message}`)
                    }
                    this.isEdit = false;
                } else {
                    if(!this.isCreate){
                        let userInfo = JSON.parse(sessionStorage.getItem('user_info'));
                        this.demandData.state = this.demandInfo.state;
                        this.demandData.id = this.demandInfo.id;
                        this.demandData.human = userInfo.userName;
                        this.demandData.dept = userInfo.userDept;
                        let t = new Date();
                        this.demandData.time = t.getFullYear() + '-' + ('0' + (Number(t.getMonth()) + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2) + ' ' + ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2) + ':' + ('0' + t.getSeconds()).slice(-2)
                    }
                    let result = await Ajax({
                        url: this.isCreate? '/demand/add' : '/demand/approve',
                        method: 'POST',
                        data: this.isCreate? this.demandInfo : this.demandData
                    });
                    load.close();
                    if(result.code === 200){
                        this.$message.success(this.isCreate? '新增需求成功' : '需求审批成功');
                    } else {
                        this.$message.warning((this.isCreate? '新增需求失败' : '需求审批失败') + `,原因：${result.message}`);
                    }
                }
                this.getDataList();
                this.userCheckList = [];
                this.demandInfo = {
                    name: '',
                    amount: '',
                    type: '',
                    level: '',
                    unit: '',
                    contact: '',
                    phone: '',
                    time: '',
                    fileName: '',
                    remark: '',
                    handler: ''
                };
                this.demandData = {
                    state: '',
                    id: '',
                    handler: '',
                    dept: '',
                    human: '',
                    time: '',
                    remark: ''
                };
                this.userCheckList = [];
                this.handlerCheckList = [];
                this.fileList = [];
            },
        }
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
            width: 50%;
        }
        .el-checkbox{
            width: 140px;
            margin: 4px;
        }
</style>