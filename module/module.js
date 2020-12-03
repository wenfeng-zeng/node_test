const connection = require('./sql')

module.exports = {
  getPrizeList (callback) {
    let sql = 'SELECT * FROM prizeList';
    // connection.connect();
    connection.sqlConnection.query(sql, (err, result) => {
      callback(err, result)
    })
  }
}