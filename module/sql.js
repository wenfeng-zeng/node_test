const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '49.234.212.42',
  user: 'node_test',
  password: 'wf930522',
  database: 'node_test'
});
module.exports = {
  sqlConnection: connection
}