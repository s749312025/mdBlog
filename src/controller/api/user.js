const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
    async getAction() {
        let data;
        if (this.id) {
            const pk = this.modelInstance.pk;
            data = await this.modelInstance.where({ [pk]: this.id }).find();
            return this.success(data);
        }
        data = await this.modelInstance.select();
        return this.success(data);
    }

    async postAction() {
        // const user = this.model('user');
        return this.fail(200, '禁止注册')
        const data = {
            username: this.post('username'),
            password: this.post('password')
        }
        const result = await this.modelInstance.thenAdd(data, { username: data.username })
    }

};
