const fs = require('fs'),
      path = require('path'),
      {logs} = require('../util');

const CommonRoute = app => {
    app.get('/basedata/:type', async (req, res) => {
        let type = req.params.type,
            filePath = path.resolve(__dirname, `../public/basedata/${type}.json`);

        logs(filePath);
        if (fs.existsSync(filePath)) {
            let file = fs.readFileSync(filePath),
                content = file.toString(),
                data = {};
            try {
                data = JSON.parse(content);
            } catch (e) {
                console.log(e);
            } finally {
                res.send({code: 200, message: '', data});
            }
        } else {
            res.send({code: 404, message: '字典数据不存在'});
        }
    });

    app.get('/home/statistical', (req, res) => {
        res.send({
            code: 200,
            message: '',
            data: {
                progress: {
                    develop: Math.ceil(Math.random() * 100),
                    data: Math.ceil(Math.random() * 100),
                    work: Math.ceil(Math.random() * 100)
                },
                project: {
                    prod: Math.ceil(Math.random() * 150000),
                    mgr: Math.ceil(Math.random() * 140000),
                    project: Math.ceil(Math.random() * 150000),
                    rew: Math.ceil(Math.random() * 120000)
                }
            }
        })
    });

    app.get('/home/analysis', (req, res) => {
        let month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            ress = [],
            prod = [],
            city = ['北京', '南京', '杭州', '上海', '深圳', '广东', '合肥'],
            cRes = [],
            cProd = [],
            preYear = Math.ceil(Math.random() * 100000 + 100000),
            curYear = Math.ceil(Math.random() * 60000 + 100000),
            curRes = Math.ceil(Math.random() * 56);

        for (let i = 0;i < month.length;i ++) {
            ress.push(Math.ceil(Math.random() * 800 + 200));
            prod.push(Math.ceil(Math.random() * 800 + 200));
        }

        for (let i = 0;i < city.length;i ++) {
            cRes.push(Math.ceil(Math.random() * 800 + 200));
            cProd.push(Math.ceil(Math.random() * 800 + 200));
        }
        res.send({
            code: 200,
            message: '',
            data: {
                line: {
                    month,
                    res: ress,
                    prod
                },
                bar: {
                    city,
                    cRes,
                    cProd
                },
                pie: {
                    preYear,
                    curYear,
                    res: curRes,
                    prod: 100 - curRes
                }
            }
        })
    });
}

module.exports = CommonRoute;