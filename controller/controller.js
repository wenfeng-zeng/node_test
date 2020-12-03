const listModule = require('../module/module')
module.exports = {
  getPrizeList (req, res) {
    listModule.getPrizeList((err, result) => {
      if (err) console.error(err);
      let resObj = null;
      console.log(result)
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
  getPrize (req, res) {
    listModule.getPrize((err, result) => {
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
  getPrizeHistory (req, res) {
    listModule.getPrizeHistory((err, result) => {
      if (err) console.error(err);
      let resObj = null;
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
}