const stateList = ['需求提交', '总部初审', '科室评审', '科室审批', '总部审批', '完成'],
    DemandSchema = require('../db/DemandSchema'),
    { findOne, saveOne, findMany, updateOne, totalCount, deleteOne } = require('../db/OperateDb');

const DemandRoute = app => {
    app.post('/demand/add', async (req, res) => {
        let data = req.body;
        data.state = stateList[1];
        data.id = `DEMAND-${Date.now()}`;
        let result = await saveOne(DemandSchema, data);
        res.send(result);
    });

    app.get('/demand/list', async (req, res) => {
        let query = req.query,
            reg = new RegExp(query.name),
            stateReg = new RegExp(query.dept || ''),
            queryParams = {name: {$regex: reg}, state: {$regex: stateReg}};

        let totalRes = await totalCount(DemandSchema, queryParams);
        if (totalRes.code !== 200) {
            res.send(totalRes);
            return;
        }

        let result = await findMany(DemandSchema, queryParams, parseInt(query.pageNum), parseInt(query.pageSize));
        if (result.code !== 200) {
            res.send(result);
            return;
        }

        res.send({code: 200, message: '', data: {total: totalRes.data, rows: result.data}});
    });

    app.get('/demand/:id', async (req, res) => {
        let result = await findOne(DemandSchema, {id: req.params.id});
        res.send(result);
    });

    app.post('/demand/update', async (req, res) => {
        let result = await updateOne(DemandSchema, {id: req.body.id}, req.body);
        res.send(result);
    });

    app.post('/demand/approve', async (req, res) => {
        let query = req.body,
            state = query.state,
            stateIndex = stateList.findIndex(oo => oo === state) + 1;

        if (stateIndex === stateList.length) {
            res.send({code: 400, message: 'order has finished, do not submit any more'});
            return;
        }

        let oldRes = await findOne(DemandSchema, {id: query.id});
        if (oldRes.code !== 200) {
            res.send(oldRes);
            return;
        }

        if (!oldRes.data) {
            res.send({code: 400, message: 'order not exists'});
            return;
        }

        let approveInfo = oldRes.data.approveInfo;
        approveInfo.push({dept: query.dept, human: query.human, time: query.time, remark: query.remark});

        let submitData = {approveInfo, state: stateList[stateIndex], handler: query.handler};

        let result = await updateOne(DemandSchema, {id: query.id}, submitData);
        res.send(result);
    });

    app.post('/demand/delete/:id', async (req, res) => {
        let oldRes = await findOne(DemandSchema, {id: req.params.id});
        if (oldRes.state !== '总部初审') {
            res.send({code: 400, message: 'work order is processing cannot be deleted.'});
            return;
        }

        let result = await deleteOne(DemandSchema, {id: req.params.id});
        res.send(result);
    });
};

module.exports = DemandRoute;