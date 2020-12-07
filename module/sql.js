const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: '49.234.212.42',
//   user: 'node_test',
//   password: 'wf930522',
//   database: 'node_test'
// });
const pool = mysql.createPool({
  host: '49.234.212.42',
  database: 'node_test',
  user: 'node_test',
  password: 'wf930522'
});
const connect = {
  do: (sql, params) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if (err) {
          console.log('和mysql数据库建立连接失败', sql);
          // reject(err)
        } else {
          conn.query(sql, (err2, res) => {
            if (err2) {
              console.log('查询数据库失败');
              reject(err)
            } else {
              // callback(err, res)
              resolve({ err2, res })
              conn.release()
            }
          })
        }
      });
    })
  }
}
// module.exports = {
//   sqlConnection: pool
// }
module.exports = connect