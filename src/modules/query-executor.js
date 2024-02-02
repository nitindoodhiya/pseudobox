const mysql = require("../connections/mysql");

async function queryExecutor(query, values) {
  const connection = mysql.getConnection();
  return connection.execute(query, values);
}

module.exports = queryExecutor;