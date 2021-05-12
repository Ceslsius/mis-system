const FileRoute = require('./FileRoute'),
      UserRoute = require('./UserRoute'),
      DemandRoute = require('./DemandRoute'),
      BudgetRoute = require('./BudgetRoute'),
      CommonRoute = require('./CommonRoute');

const Router = app => {
    app.all('*', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With,token");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", "3.2.1");
        res.header("Content-Type", "application/json;charset=utf-8");

        next();
    });

    CommonRoute(app);
    FileRoute(app);
    DemandRoute(app);
    BudgetRoute(app);
    UserRoute(app);
};

module.exports = Router;