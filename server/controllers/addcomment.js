const { mysql } = require('../qcloud')
module.exports = async (ctx)=>{
    const {openid,bookid,comment,phone,location} = ctx.request.body
    console.log(openid,bookid,comment,phone,location)
    try {
        await mysql('comments').insert({openid,bookid,comment,phone,location})
        ctx.state = {
            code:0,
            data:{
                msg:"评论成功"
            }
        }
    } catch (e) {
        console.log(e)
        ctx.state = {
            code:-1,
            data:{
                msg:"评论失败"
            }
        }
    }

}