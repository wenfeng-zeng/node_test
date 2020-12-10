const express = require('express')
var router = require('./router/router.js');
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(8899, () => {
  console.log('express 服务器已经运行,请通过 http://49.234.212.42:8899 访问');
})
app.use(router);