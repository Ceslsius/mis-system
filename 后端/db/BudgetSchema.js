const MisDB = require('./index');

const BudgetSchema = new MisDB.Schema({
    id: {type: String, required: true},                             // 预算流水号
    state: {type: String, required: true},                          // 预算状态
    name: {type: String, required: true},                           // 预算名称
    area: {type: String, required: true},                           // 领域
    type: {type: String, required: true},                           // 类型
    unit: {type: String, required: true},                           // 提报单位
    time: {type: String, required: true},                           // 提报时间
    contact: {type: String, required: true},                        // 联系人
    phone: {type: String, required: true},                          // 联系方式
    fileName: {type: String, required: true},                       // 附件
    remarkFile: {type: String, required: true},                     // 预算说明文件
    handler: {type: String, required: true},                        // 当前处理人
    approveInfo: [{dept: String, human: String, remark: String}]    // 审批信息（dept：部门，human：审批人，remark：审批意见）
});

module.exports = MisDB.model('BudgetSchema', BudgetSchema, 'budget_coll');