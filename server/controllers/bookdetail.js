const { mysql } = require('../qcloud.js')
module.exports = async (ctx)=>{
  const { bookid } = ctx.request.query
  await mysql('books')
        .where('id',bookid)
        .increment('count',1)
              
  const books =  await mysql('books')
                .select('books.*','csessioninfo.user_info')
                .join('csessioninfo','books.openid','csessioninfo.open_id')
                .where('id',bookid)
                .first()
  const info = JSON.parse(books.user_info)
  const boo = Object.assign({},books,{
    user_info:info,
    tags:books.tags.split(","),
    summary:books.summary.split("\n")
  })

  ctx.state.data = boo
  console.log(boo)
}