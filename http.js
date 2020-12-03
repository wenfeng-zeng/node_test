const express = require('express')
var router = require('./router/router.js');
const app = express()
app.listen(8899, () => {
  console.log('express 服务器已经运行,请通过 http://49.234.212.42:8899 访问');
})
app.use(router);

// app.get('/getIndex', (req, res) => {
//   const connection = mysql.createConnection({
//     host: '49.234.212.42',
//     user: 'node_test',
//     password: 'wf930522',
//     database: 'node_test'
//   });
//   // 打开连接
//   connection.connect();
//   let sql = 'SELECT * FROM prizeList';
//   // connection.query(sql语句,执行sql语句之后的回调函数);
//   connection.query(sql, (err, result, fileds) => {
//     //err  如果有错，会报错
//     //result 查询出来的数组
//     //fileds 查出表格所有的字段
//     console.log(err);
//     // console.log(result);
//     // console.log(fileds);
//     res.send(result);
//   })

//   // connection.end();
// });
// app.post('/postIndex', (req, res) => {
//   res.send('收到post请求');
// });
// app.use(router);