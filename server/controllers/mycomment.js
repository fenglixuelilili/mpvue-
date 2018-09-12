const { mysql } = require('../qcloud')
module.exports = async (ctx) => {
    const { bookid,openid } = ctx.request.query

    const res = mysql('comments')
        .select('comments.*','cSessionInfo.user_info')
        .join('cSessionInfo','cSessionInfo.open_id','comments.openid')
    let book_res  
    if(bookid){
        book_res = await res.where('bookid',bookid)
    }else if(openid){
         book_res = await res.where('openid',openid)
    }
    ctx.state.data = {
        list : book_res.map((x)=>{
            const userInfo = JSON.parse(x.user_info)
            return Object.assign({},x,{
                title:userInfo.nickName,
                image:userInfo.avatarUrl
            })
        })
    }
    
}