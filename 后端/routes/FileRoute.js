
const multer = require('multer'),
    storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './public/static-file');
        },
        filename(req, file, cb) {
            let _name = file.originalname,
                _idx = _name.lastIndexOf('.'),
                _fileName = _name.substring(0, _idx),
                _prefix = _name.substring(_idx);
            
            cb(null, `${_fileName}.${Date.now()}${_prefix}`);
        }
    }),
    upload = multer({storage, limits: {files: 10, fileSize: 1024 * 1024 * 10}});

const FileRoute = app => {
    app.post('/file/upload', upload.array('fileName'), (req, res) => {
        res.send({code: 200, message: '', data: req.files});
    });
};

module.exports = FileRoute;