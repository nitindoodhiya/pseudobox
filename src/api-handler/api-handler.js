
const deleteFile = require("./handlers/delete");
const getFile = require("./handlers/get-file");
const getFiles = require("./handlers/get-files");
const update = require("./handlers/update");
const upload = require("./handlers/upload");

function apiHandler(app) {
  app.post('/files/upload', ...upload);
  app.get('/files/:fileId', getFile);
  app.delete('/files/:fileId', deleteFile);
  app.put('/files/:fileId', ...update)
  app.get('/files', getFiles);
}

module.exports = apiHandler;