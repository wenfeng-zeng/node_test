const listModule = require('../module/module')
module.exports = {
  getPrizeList (req, res) {
    listModule.getPrizeList((err, result) => {
      if (err) console.error(err);
      let resObj = null;
      console.log(result)
      if (result.affectedRows == 1) {
        resObj = {
          code: 200,
          msg: 'success'
        }
      } else {
        resObj = {
          code: 401,
          msg: 'fail'
        }
      }
      res.send(resObj)
    })
  },
}