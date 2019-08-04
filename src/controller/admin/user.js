const Base = require('../base')


module.exports = class extends Base {
    async loginAction() {
        let { username, password } = this.post()
        console.log({ username, password })
        let data = await this.model('user').where({ username, password }).find()
        if (think.isEmpty(data)) {
            return this.fail(403, '账号密码错误')
        } else {
            this.session('userinfo', data);
            return this.success({ success: true, user: data })
        }
    }
}