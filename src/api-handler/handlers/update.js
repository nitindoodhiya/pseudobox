const fs = require('fs').promises; // Using promises version of fs

const multer = require("../../modules/multer");
const { InternalServerError, errorHandler } = require("../../modules/errors");
const queryExecutor = require("../../modules/query-executor");

const response = (res, object) => res.status(200).json(object);
const getFile = async (fileId) => {
    const query = `SELECT original_file_name, file_name, mimetype FROM files WHERE id = ?`;
    const results = await queryExecutor(query, [fileId])

    if (results[0].length === 0) {
        throw new NotFoundError("File not found")
    }
    return results[0][0];
}

const deleteFile = async (fileId) => {
    const file = await getFile(fileId);
    const filePath = `./uploads/${file.file_name}`;
    console.log({filePath});
    try {
        await fs.access(filePath, fs.constants.F_OK);
        await fs.unlink(filePath);
    } catch (err) {
        throw new InternalServerError(err);   
    }
}


async function update(req, res) {
    const fileId = req.params.fileId;
    const { metadata } = req.body;
    let query = `UPDATE files SET metadata = ? WHERE id = ?`;
    let values = [metadata, fileId];
    if(req.file) {
        await deleteFile(fileId);
        const createdAt = new Date();
        const { filename, originalname, size, mimetype } = req.file;
        query = `UPDATE files SET file_name = ?, original_file_name = ?, created_at = ?, size = ?, mimetype = ?, metadata = ? WHERE id = ?`;
        values = [filename, originalname, createdAt, size, mimetype, metadata, fileId];
    }
    try {
        await queryExecutor(query, values);
        return response(res, { success: true });
    } catch (error) {
        console.log(error);
        if (error.code !== "ER_DUP_ENTRY") throw error;
    }
}

module.exports = [
    multer(),
    async (req, res) => {
        try {
            return await update(req, res)
        } catch (error) {
            const errorResponse = errorHandler(error);
            console.log(error);
            return response(res, errorResponse);
        }
    }
];