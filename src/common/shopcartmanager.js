'use strict'

const key = 'goods'
module.exports = {
  saveToLocal (goodsObj) {
    // 1. 通过key，从localstoryage中将原来的数据读取出来
    let goodsList = JSON.parse(localStorage.getItem(key) || '[]')

    // 2. 拼接好数据
    if (goodsList.length === 0) {
      goodsList.push(goodsObj)
    } else {
      let isExist = true
      for (var i = 0; i < goodsList.length; i++) {
        // 如果已经存在该商品，就加count
        if (goodsList[i].goodsId == goodsObj.goodsId) {
          goodsList[i].count += goodsObj.count
          isExist = true
          break
        } else {
          isExist = false
        }
      }
      // 3. 判断如果不存在该商品，就添加
      if (!isExist) {
        goodsList.push(goodsObj)
      }
    }
    // 4. 以覆盖的形式写入localStorage
    localStorage.setItem(key, JSON.stringify(goodsList))
  }
}