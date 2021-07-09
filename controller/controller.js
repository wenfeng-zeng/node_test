const listModule = require('../module/module')
const jwt = require('jsonwebtoken');
const fs = require("fs");
module.exports = {
  login(query, res) {
    listModule.login(query, (err, result) => {
      if (err) console.error(err);
      let resObj = null;
      if (result && result.length > 0) {
        if (result[0].password === query.password) {
          resObj = {
            code: 200,
            msg: 'success'
          }
          fs.readFile('./utils/jwt.pem', function(error, cert) {
            const token = jwt.sign({
              user: result[0].userName,
              id: result[0].id
            }, cert, {
              algorithm: 'RS256',    // 加密算法（默认值：HS256）
              expiresIn: '1h',    // 过期时间
            });
            resObj.token = token
            res.send(resObj)
          });

        } else {
          resObj = {
            code: 500,
            msg: '密码错误',
            data: []
          }
          res.send(resObj)
        }
      } else {
        resObj = {
          code: 500,
          msg: '账号不存在',
          data: []
        }
        res.send(resObj)
      }
    })
  },
  getPrizeList(req, res) {
    listModule.getPrizeList((err, result) => {
      // console.log(req.userinfo, '--- req.userinfo ')
      if (err) console.error(err);
      let resObj = null;
      // console.log(result, new Date())
      if (result) {
        resObj = {
          code: 200,
          msg: 'success',
          data: result
        }
      } else {
        resObj = {
          code: 401,
          msg: 'fail',
          data: []
        }
      }
      res.send(resObj)
    })
  },
  getPrize(req, res) {
    listModule.getPrizeList((err, result) => {
      if (err) console.error(err);
      let resObj = null;
      if (result) {
        resObj = {
          code: 200,
          msg: 'success',
          // data:result
        }
        let randomNum = Math.ceil(Math.random() * 100)
        try {
          result.forEach(e => {
            if (randomNum > e.number) {
              randomNum -= e.number
            } else {
              resObj.data = e
              e.userId = req.userinfo.id
              listModule.prizeHistory(e, (err1, result1) => {
                if (err1) console.error(err1);
              })
              throw ('循环终止')
            }
          });
        } catch (e) {
          console.log('e: ', e)
        }
      } else {
        resObj = {
          code: 401,
          msg: 'fail',
          data: []
        }
      }
      res.send(resObj)
    })
  },
  getPrizeHistory(req, res) {
    let query = req.query
    query.userinfo = req.userinfo
    listModule.getPrizeHistory(query, (err, result) => {
      if (err) console.error(err);
      let resObj = null;
      if (result) {
        resObj = {
          code: 200,
          msg: 'success',
          data: result
        }
        listModule.getCount((err1, result1) => {
          if (err1) console.error(err1);
          resObj.count = result1[0]
          res.send(resObj)
        })
      } else {
        resObj = {
          code: 401,
          msg: 'fail',
          data: [],
          count: 0
        }
        res.send(resObj)
      }
    })
  },
  getUserInfo(req, res) {
    let userinfo = req.userinfo
    listModule.getUserInfo(userinfo, (err, result) => {
      if (err) console.error(err);
      let resObj = null;
      if (result) {
        resObj = {
          code: 200,
          msg: 'success',
          data: result[0]
        }
      } else {
        resObj = {
          code: 401,
          msg: '查无数据',
          data: [],
        }
      }
      res.send(resObj)
    })
  },
  getEchartsInfo(req, res) {
    listModule.getEchartsInfo((err, result) => {
      if (err) console.error(err);
      let resObj = null;
      console.log(result)
      if (result) {
        resObj = {
          code: 200,
          msg: 'success'
        }
        // let data = {
        //   echartsData1: [],
        //   echartsData2: [],
        //   echartsData3: [],
        // }
        let data = {
          turnover: { data: [], title: '' },
          faceValue: { data: [], title: '' },
          order: { data: [], title: '' }
        }
        let temp = {}
        result.forEach(e => {
          if (e.type === 1) {
            data.turnover.data.push(e)
            data.turnover.title = e.title
          } else if (e.type === 2) {
            data.order.data.push(e)
            data.order.title = e.title
          } else if (e.type === 3) {
            data.faceValue.title = e.title
            data.faceValue.data.push(e)
          }
        })
        resObj.data = data
      } else {
        resObj = {
          code: 401,
          msg: '查无数据',
          data: [],
        }
      }
      res.send(resObj)
    })
  },
  getFullScreenInfo(req, res) {
    listModule.getFullScreenInfo((err, result) => {
      if (err) console.error(err);
      let resObj = null;
      console.log(result)
      if (result) {
        resObj = {
          code: 200,
          msg: 'success'
        }
        let data = []
        let typeList = []
        result.forEach((e, i) => {
          typeList.push(e.type)
          if (i === 0) {
            data.push({ years: e.years, type: e.type, data: [{ type: e.type, num: e.num }] })
          } else {
            let index = data.findIndex((item) => {
              return item.years === e.years
            })
            if (index === -1) {
              data.push({ years: e.years, data: [{ type: e.type, num: e.num }] })
            } else {
              data[index].data.push({ type: e.type, num: e.num })
            }
          }
        })
        resObj.data = {
          data: data,
          typeList: Array.from(new Set(typeList))
        }
      } else {
        resObj = {
          code: 401,
          msg: '查无数据',
          data: [],
        }
      }
      res.send(resObj)
    })
  },
}