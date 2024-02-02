const { errorHandler } = require("../../modules/errors");
const queryExecutor = require("../../modules/query-executor");
const response = (res, object) => res.status(200).json(object);

async function getFiles(req, res) {
    const query = `SELECT id, original_file_name, file_name, mimetype, metadata FROM files`;
    const results = await queryExecutor(query)

    if (results[0].length === 0) {
        return res.status(404).json({ error: 'File not found' });
    } else {
        const files = results[0].map((file) => ({
            ...file,
            url: `http://localhost:3000/files/uploads/${file.file_name}`,
        }));
        return response(res, { files });
    }
}

module.exports = async (req, res) => {
    try {
        return await getFiles(req, res)
    } catch (error) {
        const errorResponse = errorHandler(error);
        console.log(error);
        return response(res, errorResponse);
    }
};