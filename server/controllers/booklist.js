const {
  mysql
} = require('../qcloud')
module.exports = async (ctx) => {
  const {
    page,
    size
  } = ctx.request.query
  const books = await mysql('books')
    .select('books.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
    .limit(size)
    .offset(Number(page) * size)
    .orderBy('id', 'desc')
  // offset是设置查询的起点
  // limit 是试着限制多少条

  ctx.state.data = {
    list: books.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        user_info: {
          nickname: info.nickName
        }
      })
    })
  }
  console.log(page)
  console.log("哈哈哈哈")
  console.log(books)
}
