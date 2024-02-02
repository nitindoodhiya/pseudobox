const fs = require('fs').promises; // Using promises version of fs

const { NotFoundError, errorHandler } = require("../../modules/errors");
const queryExecutor = require("../../modules/query-executor");
const response = (res, object) => res.status(200).json(object);

const deleteFromDB = async (fileId) => {
    const query = `SELECT original_file_name, file_name, mimetype FROM files WHERE id = ?`;
    const results = await queryExecutor(query, [fileId])

    if (results[0].length === 0) {
        throw new NotFoundError("File not found")
    }

    const file = results[0][0];
    const deleteQuery = `DELETE FROM files WHERE id = ?`;
    const result = await queryExecutor(deleteQuery, [fileId]);
    if(result[0]?.affectedRows === 1) {
        return file;
    } else {
        return null;
    }
}

const deleteFromStorage = async (filename) => {
    const filePath = `./uploads/${filename}`;
    try {
        await fs.access(filePath, fs.constants.F_OK);
        await fs.unlink(filePath);
    } catch (err) {
            throw InternalServerError("Error  Deleting file");   
    }
}

async function deleteFile(req, res) {
    const fileId = req.params.fileId;
    const file = await deleteFromDB(fileId);
    await deleteFromStorage(file.file_name);
    return response(res, { success: true });
}

module.exports = async (req, res) => {
    try {
        return await deleteFile(req, res)
    } catch (error) {
        const errorResponse = errorHandler(error);
        console.log(error);
        return response(res, errorResponse);
    }
};