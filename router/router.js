var express = require('express');
const fs = require("fs");
const app = express()
var router = express.Router();
const controller = require('../controller/controller')
// const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken');
router.use(function (req, res, next) {
  if (req.originalUrl === '/login') {
    next()
  } else {
    var token = req.query.token || req.headers['authorization'];
    if (token) {
      fs.readFile('./utils/jwt_pub.pem', function (error, cert) {
        jwt.verify(token, cert, (err, decoded) => {
          // token失效
          if (err) {
            res.json({ success: false, message: '无效的token.' });
          } else {
            req.userinfo = decoded;
            next();
          }
        });
      });
    } else {
      return res.status(403).send({
        success: false,
        message: '没有找到token.'
      });
    }
  }
});
// app.use(expressJwt({
//   secret: 'secret12345',  // 签名的密钥 或 PublicKey
//   algorithms: ['HS245']
// }).unless({
//   path: [{ url: '/login', methods: ['POST'] }]  // 指定路径不经过 Token 解析
// }))
router.post('/login', function (req, res) {
  controller.login(req.body, res)
})
router.get('/getIndex', (req, res) => {
  res.send('收到get请求');
});
router.post('/prizeList', (req, res) => {
  controller.getPrizeList(req, res)
});
router.post('/getPrize', (req, res) => {
  controller.getPrize(req, res)
});
router.get('/getPrizeHistory', (req, res) => {
  console.log(1234)
  controller.getPrizeHistory(req, res)
});
router.get('/getParticlesJson', (req, res) => {
  fs.readFile("./files/particles.json", function (error, data) {
    if (error) {
      console.log(error)
      res.send("文件读取失败");
    } else {
      res.send(data)
    }
  })
});
module.exports = router;