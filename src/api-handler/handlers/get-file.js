const { errorHandler } = require("../../modules/errors");
const queryExecutor = require("../../modules/query-executor");
const response = (res, object) => res.status(200).json(object);

async function getFile(req, res) {
    const fileId = req.params.fileId;
    const query = `SELECT original_file_name, file_name, mimetype FROM files WHERE id = ?`;
    const results = await queryExecutor(query, [fileId])

    if (results[0].length === 0) {
        return res.status(404).json({ error: 'File not found' });
    } else {
        const file = results[0][0];
        const filePath = `./uploads/${file.file_name}`;
        return res.download(filePath, file.file_name);
    }
}

module.exports = async (req, res) => {
    try {
        return await getFile(req, res)
    } catch (error) {
        const errorResponse = errorHandler(error);
        console.log(error);
        return response(res, errorResponse);
    }
};