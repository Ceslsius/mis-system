const {logs} = require('../util');

exports.findMany = (schema, params, pageNum, pageSize) => {
    return new Promise(resolve => {
        schema.find(params)
            .skip(pageSize * (pageNum - 1))
            .limit(pageSize)
            .sort({userId: 1})
            .exec((err, doc) => {
                if (!!err) {
                    logs('findMany methods', err);
                    resolve({code: 500, message: 'database findMany error'});
                } else {
                    resolve({code: 200, data: doc});
                }
            });
    })
}

exports.totalCount = (schema, params) => {
    return new Promise(resolve => {
        schema.count(params, (err, counts) => {
            if (!!err) {
                logs('totalCount methods', err);
                resolve({code: 500, message: 'database totalCount error'});
            } else {
                resolve({code: 200, data: counts});
            }
        })
    })
}

exports.findOne = (schema, params) => {
    return new Promise(resolve => {
        schema.findOne(params, (err, doc) => {
            if (!!err) {
                logs('findOne methods', err);
                resolve({code: 500, message: 'database findOne error'});
            } else {
                resolve({code: 200, message: '', data: doc});
            }
        })
    })
};

exports.updateOne = (schema, params, data) => {
    return new Promise(resolve => {
        schema.updateOne(params, {$set: data}, err => {
            if (!!err) {
                logs('updateOne methods', err);
                resolve({code: 500, message: 'database updateOne error'});
            } else {
                resolve({code: 200, message: ''});
            }
        })
    })
};

exports.saveOne = (schema, params) => {
    return new Promise(resolve => {
        let model = new schema(params);
        model.save(params, err => {
            if (!!err) {
                logs('saveOne methods', err);
                resolve({code: 500, message: 'database saveOne error'});
            } else {
                resolve({code: 200, message: ''});
            }
        })
    })
};

exports.deleteOne = (schema, params) => {
    return new Promise(resolve => {
        schema.remove(params, err => {
            if (!!err) {
                logs('deleteOne methods', err);
                resolve({code: 500, message: 'database deleteOne error'});
            } else {
                resolve({code: 200, message: ''});
            }
        });
    })
}