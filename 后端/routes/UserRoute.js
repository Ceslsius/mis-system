const {EncodeAES, DecodeAES, EncodeMD5, secretKey} = require("../util"),
    UserModel = require('../db/UserSchema'),
    {findOne, updateOne, saveOne, findMany, totalCount, deleteOne} = require('../db/OperateDb');

const UserRoute = app => {
    app.post('/user/login', async (req, res) => {
        let data = req.body || {},
            userId = data.userId || "",
            userPwd = data.userPwd || "";

        if (!userId || !userPwd) {
            res.send({code: 400, message: 'missing parameter userid or userpwd'});
        } else {

            let result = await findOne(UserModel, {userId});
            if (result.code !== 200) {
                res.send(result);
                return;
            }

            if (result.code === 200 && !result.data) {
                res.send({code: 400, message: 'there is no such user'});
                return;
            }
            let userDoc = result.data;
            let newPwd = EncodeMD5(userDoc.userPwd);
            console.log(newPwd);
            if (newPwd !== userPwd) {
                res.send({code: 400, message: 'password error'});
            } else {
                let token = EncodeAES(`${userDoc.userId}.${userDoc.userPwd}.${Date.now()}`, secretKey);
                let _uRes = await updateOne(UserModel, {userId}, {token});
                if (_uRes.code !== 200) {
                    res.send(_uRes);
                } else {
                    let obj = {};
                    ['userId', 'userName', 'userEntry', 'userDept', 'userSex', 'userAge', 'userAddress', 'userDate',
                        'userPhone', 'userEmail', 'userRole', 'userRemark', '', '', '', '', ].map(key => {
                        obj[key] = userDoc[key] || '';
                    });
                    obj.token = token;
                    res.send({code: 200, message: '', data: obj});
                }
            }
        }
    });

    app.post('/user/add', async (req, res) => {
        let data = req.body;

        let oldRes = await findOne(UserModel, {userId: data.userId});
        if (oldRes.code !== 200) {
            res.send(oldRes);
            return;
        }

        if (oldRes.code === 200 && !!oldRes.data) {
            res.send({code: 400, message: 'user already exists'});
            return;
        }

        let result = await saveOne(UserModel, data);
        res.send(result);
    });

    app.get('/user/list', async (req, res) => {
        let query = req.query,
            _pn = parseInt(query.pageNum || 1),
            _ps = parseInt(query.pageSize || 15),
            _name = new RegExp(query.userName);
        let _total = await totalCount(UserModel, {userName: {$regex: _name}});
        
        if (_total.code !== 200) {
            res.send(_total);
            return;
        }

        let _rows = await findMany(UserModel, {userName: {$regex: _name}}, _pn, _ps);
        if (_rows.code !== 200) {
            res.send(_rows);
            return;
        }

        res.send({code: 200, message: '', data: {total: _total.data, rows: _rows.data}});
    });

    app.post('/user/update', async (req, res) => {
        let data = req.body,
            userId = data.userId,
            params = {};
        
        for (let name in data) {
            if (name !== 'userId') params[name] = data[name];
        }

        let result = await updateOne(UserModel, {userId}, params);
        res.send(result);
    });

    app.post('/user/delete/:id', async (req, res) => {
        let result = await deleteOne(UserModel, {userId: req.params.id});
        res.send(result);
    });

    app.get('/user/info/:id', async (req, res) => {
        let result = await findOne(UserModel, {userId: req.params.id});
        res.send(result);
    });
};

module.exports = UserRoute;