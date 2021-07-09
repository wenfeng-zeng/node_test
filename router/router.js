var express = require('express');
const fs = require("fs");
const app = express()
var router = express.Router();
const controller = require('../controller/controller')
// const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken');
router.use(function(req, res, next) {
  if (req.originalUrl === '/login' || req.originalUrl === '/getParticlesJson') {
    next()
  } else {
    var token = req.query.token || req.headers['authorization'];
    if (token) {
      fs.readFile('./utils/jwt_pub.pem', function(error, cert) {
        jwt.verify(token, cert, (err, decoded) => {
          // token失效
          if (err) {
            res.json({ success: false, message: '无效的token', code: 403 });
          } else {
            req.userinfo = decoded;
            next();
          }
        });
      });
    } else {
      return res.status(403).send({
        success: false,
        message: '没有找到token.',
        code: 403
      });
    }
  }
});
router.post('/login', function(req, res) {
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
  controller.getPrizeHistory(req, res)
});
// 获取用户信息
router.post('/getUserInfo', (req, res) => {
  controller.getUserInfo(req, res)
});
router.get('/getParticlesJson', (req, res) => {
  fs.readFile("./files/particles.json", function(error, data) {
    if (error) {
      console.log(error)
      res.send("文件读取失败");
    } else {
      res.send(data)
    }
  })
});
// 实验echarts用
router.post('/getEchartsInfo', (req, res) => {
  controller.getEchartsInfo(req, res)
});
router.post('/getFullScreenInfo', (req, res) => {
  controller.getFullScreenInfo(req, res)
});
module.exports = router;