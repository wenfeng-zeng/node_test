const connection = require('./sql')

module.exports = {
  getPrizeList (callback) {
    let sql = 'SELECT * FROM prizeList';
    // connection.connect();
    connection.sqlConnection.query(sql, (err, result) => {
      callback(err, result)
    })
  },
  getPrize (callback) {
    // let sql = "update prizeList set name='京豆', number=15 where id=1";
    // connection.connect();
    let sql = 'SELECT * FROM prizeList';
    connection.sqlConnection.query(sql, (err, result) => {
      callback(err, result)
    })
  },
  prizeHistory (val, callback) {
    // let sql = `SELECT * FROM prizeList where id=${id}`;
    let time = new Date().getTime()
    let sql = `INSERT INTO prizeHistory (name, number, isdeleted, id,date) VALUES ('${val.name}', ${val.number}, ${val.isdelete}, ${val.id},${time})`
    connection.sqlConnection.query(sql, (err, result) => {
      callback(err, result)
    })
  },
  getPrizeHistory (callback) {
    let sql = 'SELECT * FROM prizeHistory';
    // connection.connect();
    connection.sqlConnection.query(sql, (err, result) => {
      callback(err, result)
    })
  },
}