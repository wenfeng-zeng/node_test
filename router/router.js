var express = require('express');
const app = express()
var router = express.Router();
const controller = require('../controller/controller')
router.get('/getIndex', (req, res) => {
  // controller.getIndex(req,res)
  res.send('收到get请求');
});
router.get('/prizeList', (req, res) => {
  controller.getPrizeList(req, res)
});
// app.get('/getIndex', (req, res) => {
//   res.send('收到get请求');
// });
// app.post('/postIndex', (req, res) => {
//   res.send('收到post请求');
// });
// app.get('/prizeList', (req, res) => {
//   controller.getPrizeList(req, res)
// });
// app.post('/getPrize', (req, res) => {
//   let data = { ...prizeList }
//   let randomNum = Math.ceil(Math.random() * 100)
//   let resInfo = {
//     code: 0,
//     message: 'success',
//     data: {}
//   }
//   data.data.list.forEach(e => {
//     if (randomNum > e.number) {
//       randomNum -= e.number
//     } else {
//       resInfo.data = e
//       res.send(resInfo);
//     }
//   });
// })

module.exports = router;