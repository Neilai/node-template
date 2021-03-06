const {
  controller,
  get,
  post,
  put,
    required
} = require('../utils/decorator')
const {
  checkPassword
} = require('../api/user')

@controller('/api/user')
export class userController {

  @post('/')
  @required({
      body: ['email', 'password']
  })
  async login (ctx, next) {
    const { email, password } = ctx.request.body
      console.log(email,password);
    const matchData = await checkPassword(email, password)

    if (!matchData.user) {
      return (ctx.body = {
        success: false,
        err: '用户不存在'
      })
    }

    if (matchData.match) {
      return (ctx.body = {
        success: true
      })
    }

    return (ctx.body = {
      success: false,
      err: '密码不正确'
    })
  }
}