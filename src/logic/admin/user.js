module.exports = class extends think.Logic {
    loginAction() {
        this.allowMethods = 'post' //  只允许 POST 请求类型
        let rules = {
            username: {
                string: true,
                required: true,
                trim: true,
                method: 'POST'
            },
            username: {
                string: true,
                required: true,
                trim: true,
                method: 'POST'
            }
        }
        let flag = this.validate(rules)
        if (!flag) {
            return this.fail('validate error', this.validateErrors)
        }
    }
}