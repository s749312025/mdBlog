const BaseRest = require('../rest.js');


module.exports = class extends BaseRest {
    async postAction() {
        const pk = this.modelInstance.pk;
        const createTime = this.post('create_time') ? (new Date(this.post('create_time'))).getTime() : (new Date()).getTime();
        const data = this.post();
        data.create_time = createTime
        data.modify_time = createTime
        delete data[pk];
        if (think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        const insertId = await this.modelInstance.add(data);
        return this.success({ id: insertId });
    }

    async putAction() {
        if (!this.id) {
            return this.fail('params error');
        }
        const pk = this.modelInstance.pk;
        const data = this.post();
        data[pk] = this.id; // rewrite data[pk] forbidden data[pk] !== this.id
        if (think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        data.modify_time = (new Date()).getTime()
        const rows = await this.modelInstance.where({ [pk]: this.id }).update(data);
        return this.success({ affectedRows: rows });
    }
}