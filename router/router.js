var express = require('express');
const app = express()
var router = express.Router();
const controller = require('../controller/controller')
router.get('/getIndex', (req, res) => {
  // controller.getIndex(req,res)
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

module.exports = router;