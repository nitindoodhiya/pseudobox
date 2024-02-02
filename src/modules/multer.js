const multer = require('multer');

const storage = () => multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (request, file, callback) {
        const str = file.originalname.split(".");
        const ext = str[str.length -1];
        const filename = new Date().getTime().toString() + "." + ext;
        file.filename = filename;
        console.log(file);
        callback(null, filename);
    }
});

const upload = () => multer({ storage: storage() }).single('file');

module.exports = upload