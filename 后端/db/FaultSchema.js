const MisDB = require('./index');

const FaultSchema = new MisDB.Schema({
    code: {type: String, required: true},                                               // 单据编号 自动生成
    title: {type: String, required: true},                                              // 标题
    content: {type: String, required: true},                                            // 内容
    cusName: {type: String, required: true},                                            // 客户名称
    cusCode: {type: String, required: true},                                            // 客户编号
    cusLevel: {type: String, required: true},                                           // 客户服务级别
    service: {type: String, required: true},                                            // 机器实例编号
    type: {type: String, required: true},                                               // 业务类型
    level: {type: String, required: true},                                              // 保障等级
    startTime: {type: Date, required: true},                                            // 派单时间
    handleTime: {type: Number, required: true},                                         // 处理时限
    endTime: Date,                                                                      // 完成时间
    progress: Number,                                                                   // 进度
    state: String,                                                                      // 当前环节
    handler: {type: String, required: true},                                            // 当前处理人
    segment: [{handler: String, handleTime: Date, phone: String, segment: String}]      // 已处理环节信息
});

module.exports = MisDB.model('FaultSchema', FaultSchema, 'fault_coll');