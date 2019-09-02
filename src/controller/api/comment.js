const BaseRest = require('../rest.js')

module.exports = class extends BaseRest {
    async postAction() {
        const pk = this.modelInstance.pk;
        const createTime = this.post('create_time') ? (new Date(this.post('create_time'))).getTime() : (new Date()).getTime();
        const data = this.post();
        data.create_time = createTime
        delete data[pk];
        let user_id_base = (data.user_id.substr(data.user_id.indexOf('s0819') + 5)).replace(/_/, '=')
        data.user_id = Number(new Buffer(user_id_base, 'base64').toString())
        console.log(data);
        if (think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        if (!data.user_id) {
            return this.fail('user_id error');
        }
        const insertId = await this.modelInstance.add(data);
        return this.success({ id: insertId });
    }
}
