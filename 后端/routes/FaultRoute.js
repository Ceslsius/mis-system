const stateList = ['提出', '派单', '故障T1处理', '故障T2处理', '质检', '完成'],
    FaultSchema = require('../db/FaultSchema'),
    { findOne, saveOne, findMany, updateOne, totalCount, deleteOne } = require('../db/OperateDb');

const DemandRoute = app => {
    app.post('/fault/add', async (req, res) => {
        let data = req.body;
        data.state = stateList[1];
        data.id = `FAULT-${Date.now()}`;
        let result = await saveOne(FaultSchema, data);
        res.send(result);
    });

    app.get('/demand/list', async (req, res) => {
        let query = req.query,
            reg = new RegExp(query.name),
            queryParams = {name: {$regex: reg}};

        let totalRes = await totalCount(FaultSchema, queryParams);
        if (totalRes.code !== 200) {
            res.send(totalRes);
            return;
        }

        let result = await findMany(FaultSchema, queryParams, parseInt(query.pageNum), parseInt(query.pageSize));
        if (result.code !== 200) {
            res.send(result);
            return;
        }

        res.send({code: 200, message: '', data: {total: totalRes.data, rows: result.data}});
    });

    app.get('/demand/:id', async (req, res) => {
        let result = await findOne(FaultSchema, {id: req.params.id});
        res.send(result);
    });

    app.post('/demand/update', async (req, res) => {
        let result = await updateOne(FaultSchema, {id: req.body.id}, req.body);
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

        let oldRes = await findOne(FaultSchema, {id: query.id});
        if (oldRes.code !== 200) {
            res.send(oldRes);
            return;
        }

        if (!oldRes.data) {
            res.send({code: 400, message: 'order not exists'});
            return;
        }

        let segment = oldRes.data.segment;
        segment.push({dept: query.dept, human: query.human, time: query.time, remark: query.remark});

        let submitData = {segment, state: stateList[stateIndex], handler: query.handler};

        let result = await updateOne(FaultSchema, {id: query.id}, submitData);
        res.send(result);
    });

    app.post('/demand/delete/:id', async (req, res) => {
        let oldRes = await findOne(FaultSchema, {id: req.params.id});
        if (oldRes.state !== '派单') {
            res.send({code: 400, message: 'work order is processing cannot be deleted.'});
            return;
        }
        
        let result = await deleteOne(FaultSchema, {id: req.params.id});
        res.send(result);
    });
};

module.exports = DemandRoute;