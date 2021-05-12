const MisDB = require('./index');

const DemandSchema = new MisDB.Schema({
    id: String,                                                     // 项目流水号
    state: {type: String, required: true},                          // 项目状态
    name: {type: String, required: true},                           // 项目名称
    amount: {type: Number, required: true},                         // 投资金额
    type: {type: String, required: true},                           // 投资方式
    level: {type: String, required: true},                          // 项目级别
    schedule: {type: String, required: true},                       // 工期
    unit: {type: String, required: true},                           // 提报单位
    contact: {type: String, required: true},                        // 联系人
    phone: {type: String},                                          // 联系方式
    time: {type: String, required: true},                           // 提报时间
    fileName: String,                                               // 附件
    remark: String,                                                 // 项目情况
    handler: {type: String, required: true},                        // 当前处理人
    approveInfo: [{dept: String, human: String, time: String, remark: String}]    // 审批信息（dept：部门，human：审批人，time: 审批时间，remark：审批意见）
});

module.exports = MisDB.model('DemandSchema', DemandSchema, 'demand_coll');