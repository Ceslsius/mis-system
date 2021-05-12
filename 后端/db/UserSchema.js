const MisDB = require('./index');

const UserSchema = new MisDB.Schema({
    userId: {type: String, required: true},           // 用户编码
    userName: {type: String, required: true},         // 用户姓名
    userPwd: {type: String, required: true},          // 用户密码
    userEntry: {type: Date, default: Date.now()},     // 入职日期
    userDept: String,                                 // 用户部门
    userSex: String,                                  // 用户性别
    userAge: {type: Number, default: 24},             // 用户年龄
    userAddress: String,                              // 用户地址
    userDate: {type: Date, default: Date.now()},      // 用户生日
    userPhone: String,                                // 用户手机
    userEmail: String,                                // 用户邮箱
    userRemark: String,                               // 用户备注
    token: String                                     // 用户票据
});

module.exports = MisDB.model('UserSchema', UserSchema, 'user_coll');