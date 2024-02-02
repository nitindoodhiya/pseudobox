const mysql = require("mysql2/promise");

const { mysql: mysqlConf } = require("../../conf");

let connection = null;

async function createConnection() {
  try {
    const newConnection = await mysql.createConnection({
      host: mysqlConf.host,
      user: mysqlConf.user,
      port: mysqlConf.port,
      database: mysqlConf.database,
    });
    return newConnection;
  } catch (error) {
    console.log(`FATAL_ERROR_DB_CONNECTION_${JSON.stringify(error)}`);
    throw error;
  }
}

async function assignConnection() {
  connection = await createConnection();
  console.log("assigned mysql");
}

function getConnection() {
  return connection;
}

module.exports = {
  getConnection,
  createConnection,
  assignConnection,
};