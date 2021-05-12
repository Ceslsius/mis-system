/************************************************************
 * created by Celsius on 2020-08-11 for vue configure file
 ************************************************************/

/** 引入path */
const path = require("path");

/** 定义配置config 对象 */
const Config = {
    publicPath: './',
    outputDir: 'mis-system',
    lintOnSave: false,  // 在进行保存编译的时候，是否启动lint 检查
    pages: {
        'index': {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'MIS SYSTEM'
        }
    },
    configureWebpack: config => {
        config.mode = process.env.NODE_ENV.trim() === 'production' ? 'production' : 'development';
        Object.assign(config, {
            resolve: {
                alias: {
                    '@': path.resolve(__dirname , './src')
                },
                extensions: ['.js', '.vue', '.less']
            }
        });
    },
    devServer: {
        open: 'Google Chrome',
        openPage: '/index.html',
        port: 9527,
        proxy: {
            '^/apis': {
                target: 'http://www.shuiyue.info:21000',
                pathRewrite: {'^/apis': ''}
            },
            // '^/souse': {

            // }
        }
    }
};

/** 导出config */
module.exports = Config;