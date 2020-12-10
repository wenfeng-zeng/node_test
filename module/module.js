const connection = require('./sql')
module.exports = {
  login (query, callback) {
    console.log(query)
    const { userName, password } = query
    connection.do(`SELECT * FROM user where userName='${userName}' and password='${password}'`).then(res => {
      callback(res.err2, res.res)
    })
  },
  getPrizeList (callback) {
    connection.do('SELECT * FROM prizeList').then(res => {
      callback(res.err2, res.res)
    })
  },
  prizeHistory (val, callback) {
    let time = new Date().getTime()
    // connection.sqlConnection.getConnection((err, conn) => {
    //   if (err) {
    //     console.log('和mysql数据库建立连接失败', '---prizeHistory');
    //   } else {
    //     conn.query(`INSERT INTO prizeHistory (name, number, isdeleted, prizeId,date) VALUES ('${val.name}', ${val.number}, ${val.isdelete}, ${val.id},${time})`, (err2, res) => {
    //       if (err2) {
    //         console.log('查询数据库失败');
    //       } else {
    //         callback(err, res)
    //         // connection.sqlConnection.end();
    //         conn.release()
    //       }
    //     })
    //   }
    // });
    connection.do(`INSERT INTO prizeHistory (name, number, isdeleted, prizeId,date) VALUES ('${val.name}', ${val.number}, ${val.isdelete}, ${val.id},${time})`).then(res => {
      callback(res.err2, res.res)
    })
  },
  getPrizeHistory (query, callback) {
    // let { pageNum, pageSize } = query
    // let num = (Number(pageNum) - 1) * Number(pageSize)
    // let sql = `SELECT * FROM prizeHistory  ORDER BY date desc limit ${num},${Number(pageSize)}`;
    // connection.sqlConnection.query(sql, (err, result) => {
    //   callback(err, result)
    // })
    let { pageNum, pageSize } = query
    let num = (Number(pageNum) - 1) * Number(pageSize)
    // connection.sqlConnection.getConnection((err, conn) => {
    //   if (err) {
    //     console.log('和mysql数据库建立连接失败', '---getPrizeHistory');
    //   } else {
    //     conn.query(`SELECT * FROM prizeHistory  ORDER BY date desc limit ${num},${Number(pageSize)}`, (err2, res) => {
    //       if (err2) {
    //         console.log('查询数据库失败');
    //       } else {
    //         callback(err, res)
    //         // connection.sqlConnection.end();
    //         conn.release()
    //       }
    //     })
    //   }
    // });
    connection.do(`SELECT * FROM prizeHistory  ORDER BY date desc limit ${num},${Number(pageSize)}`).then(res => {
      callback(res.err2, res.res)
    })
  },
  getCount (callback) {
    // connection.sqlConnection.getConnection((err, conn) => {
    //   if (err) {
    //     console.log('和mysql数据库建立连接失败', '---getCount');
    //   } else {
    //     conn.query(`select count(*) from prizeHistory where isdeleted='0'`, (err2, res) => {
    //       if (err2) {
    //         console.log('查询数据库失败');
    //       } else {
    //         callback(err, res)
    //         // connection.sqlConnection.end();
    //         conn.release()
    //       }
    //     })
    //   }
    // });
    connection.do(`select count(*) from prizeHistory where isdeleted='0'`).then(res => {
      callback(res.err2, res.res)
    })
  },
}