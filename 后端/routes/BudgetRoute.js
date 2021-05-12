const stateList = ['报送填写', '预算初审', '预算评审', '预算终审', '预算发布', '完成'],
    BudgetSchema = require('../db/BudgetSchema'),
    { findOne, saveOne, findMany, updateOne, totalCount, deleteOne } = require('../db/OperateDb');

const BudgetRoute = app => {
    app.post('/budget/add', async (req, res) => {
        let data = req.body;
        data.state = stateList[1];
        data.id = `BUDGET-${Date.now()}`;
        let result = await saveOne(BudgetSchema, data);
        res.send(result);
    });

    app.get('/budget/list', async (req, res) => {
        let query = req.query,
            reg = new RegExp(query.name),
            stateReg = new RegExp(query.dept || ''),
            queryParams = {name: {$regex: reg}, state: {$regex: stateReg}};

        let totalRes = await totalCount(BudgetSchema, queryParams);
        if (totalRes.code !== 200) {
            res.send(totalRes);
            return;
        }

        let result = await findMany(BudgetSchema, queryParams, query.pageNum, query.pageSize);
        if (result.code !== 200) {
            res.send(result);
            return;
        }

        res.send({code: 200, message: '', data: {total: totalRes.data, rows: result.data}});
    });

    app.get('/budget/:id', async (req, res) => {
        let result = await findOne(BudgetSchema, {id: req.params.id});
        res.send(result);
    });

    app.post('/budget/approve', async (req, res) => {
        let query = req.query,
            state = query.state,
            stateIndex = stateList.findIndex(oo => oo === state) + 1;

        if (stateIndex === stateList.length) {
            res.send({code: 400, message: 'order has finished, do not submit any more'});
            return;
        }

        let oldRes = await findOne(BudgetSchema, {id: query.id});
        if (oldRes.code !== 200) {
            res.send(oldRes);
            return;
        }

        if (!oldRes.data) {
            res.send({code: 400, message: 'order not exists'});
            return;
        }

        let approveInfo = oldRes.data;
        approveInfo.push({dept: query.dept, human: query.human, remark: query.remark});

        let submitData = {approveInfo, state: stateList[stateIndex], handler: query.handler};

        let result = await updateOne(BudgetSchema, {id: query.id}, submitData);
        res.send(result);
    });

    app.post('/budget/delete/:id', async (req, res) => {
        let oldRes = await findOne(BudgetSchema, {id: req.params.id});
        if (oldRes.state !== '预算初审') {
            res.send({code: 400, message: 'work order is processing cannot be deleted.'});
            return;
        }

        let result = await deleteOne(BudgetSchema, {id: req.params.id});
        res.send(result);
    });
};

module.exports = BudgetRoute;