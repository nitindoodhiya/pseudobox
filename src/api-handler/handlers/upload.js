const multer = require("../../modules/multer");
const { UserError, errorHandler } = require("../../modules/errors");
const queryExecutor = require("../../modules/query-executor");

const response = (res, object) => res.status(200).json(object);

async function upload(req, res) {
    if(!req.file) {
        throw new UserError("File is not sent")
    }
    const { filename, originalname, size, mimetype } = req.file;
    console.log(req.file);
    const { metadata } = req.body;
    const createdAt = new Date();
    const query = `INSERT INTO files (file_name, original_file_name, created_at, size, mimetype, metadata) VALUES (?, ?, ?, ?, ?, ?)`;
    try {
        const result = await queryExecutor(query, [filename, originalname, createdAt, size, mimetype, metadata]);
        return response(res, { insertedId: result[0].insertId });
    } catch (error) {
        console.log(error);
        if (error.code !== "ER_DUP_ENTRY") throw error;
    }
}

module.exports = [
    multer(),
    async (req, res) => {
        try {
            return await upload(req, res)
        } catch (error) {
            const errorResponse = errorHandler(error);
            return response(res, errorResponse);
        }
    }
];