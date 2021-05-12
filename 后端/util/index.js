const CryptoJS = require('crypto-js');

exports.EncodeMD5 = str => CryptoJS.MD5(str).toString().toLocaleUpperCase();
exports.EncodeAES = (str, key) => CryptoJS.AES.encrypt(str, key).toString();
exports.DecodeAES = (str, key) => CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
exports.logs = (str, obj) => {
    if (!!obj) {
        console.log(`>>>>>>>>>>>>>>>>>>>>>> ${str} start <<<<<<<<<<<<<<<<<<<<<<`);
        console.log(obj);
        console.log(`>>>>>>>>>>>>>>>>>>>>>> ${str} end <<<<<<<<<<<<<<<<<<<<<<`);
    } else {
        console.log(`>>>>>>>>>>>>>>>>>>>>>> ${str} <<<<<<<<<<<<<<<<<<<<<<`);
    }
};
exports.secretKey = 'MISSYSTEMSECRETKEY';