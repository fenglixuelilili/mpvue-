const https = require('https')
const { mysql } = require('../qcloud')
// 在这里发送请求，获取豆瓣信息以及加入数据库
module.exports = async (ctx) => {
  // 获取前端请求过来的数据
  const { isbn, openid } = ctx.request.body
  // console.log(ctx.request.body,123)
  console.log(openid, isbn)
  if (isbn && openid) {
    const bookinfo = await mysql("books").select().where('isbn',isbn)
    if(bookinfo.length){
      ctx.state = {
        code:-1,
        data:{
          msg:'此书已经存在了'
        }
      }
      return
    }
    // 获取豆瓣信息
    const res = await getJSON(`https://api.douban.com/v2/book/isbn/${isbn}`)
    // isbn openid 
    const { title, image, alt, publisher, summary, price, rating } = res
    const rate = rating.average
    const tags = res.tags.map(value => {
      return `${value.title} ${value.count}`
    }).join(",")
    const author = res.author.join(",")
    console.log(title, image, alt, publisher, summary, price, rate, tags)
    // 使用koa的mysql语句添加到数据库中
    try {
      await mysql('books').insert({
        isbn, openid, rate,title, image, alt, publisher, summary, price, tags, author
      })
      ctx.state.data = {
        title,
        msg: "成功添加"
      }
    } catch (e) {
      console.log(e)
      ctx.state = {
        code:-1,
        data:{
          msg:"添加失败"
        }
      }
    }
  }
}
// 使用nodejs自带的https模块进行监听数据请求过来的东西
function getJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let dataUrl = ''
      res.on('data', data => {
        dataUrl += data
      })
      res.on('end', data => {
        const dataJson = JSON.parse(dataUrl)
        if (dataJson.title) {
          resolve(dataJson)
        } else {
          reject({ msg: "网络错误!" })
        }
      })
    })
  })
}